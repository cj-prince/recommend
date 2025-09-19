import * as dtos from './dto';
import * as entities from './entities';
import CourseQuery from './query';
import { db } from '../../config/database';
import { CourseInterface } from './interface';
import {
  NotFoundException
} from '../../shared/lib/errors';
import {
  fetchResourceByPage,
  calcPages,
  FetchPaginatedResponse,
} from '../../shared/helpers';


export class CourseRepositoryImpl implements CourseInterface {
  private weights: {
    personalInterest: number;
    engagement: number;
    viewFrequency: number;
    coursePopularity: number;
    recency: number;
  };

  constructor() {
        this.weights = {
            personalInterest: 0.3,
            engagement: 0.25,
            viewFrequency: 0.2,
            coursePopularity: 0.15,
            recency: 0.1
        };
    }

public async fetchCourses(
    payload:dtos.CourseDTO
  ): Promise<FetchPaginatedResponse> {
    const {
      page = '1',
      limit = '30',
      search,
    } = payload;
    const [{ count }, permissions] = await fetchResourceByPage({
      page,
      limit,
      getResources: CourseQuery.fetchCourses,
      params: [search],
    });
    return {
      total: count,
      currentPage: page,
      totalPages: calcPages(count, limit),
      permissions,
    }
  };

  public async courseStats(
    course_id: string
  ): Promise<string> {
  
    const courseStats = await db.one(CourseQuery.updateCourseStats, [course_id]);

    return courseStats;
  };



  public async userCoursesEngagement(
    payload: dtos.UserCourseEngagementDTO
  ): Promise<NotFoundException | entities.FetchCourseDTOEntity> {
    const course = await db.oneOrNone(CourseQuery.fetchCourseById, [payload.course_id]);
    if (!course) {
      return new NotFoundException('Course not found.');
    }

    const userCourseEngagement = await db.oneOrNone(CourseQuery.userCourseEngagement, [payload.user_id, payload.course_id, payload.scroll_time]);

    await this.courseStats(payload.course_id);
    return userCourseEngagement;
  };

  public async updateUserCoursesEngagement(
    payload: dtos.UserCourseEngagementDTO
  ): Promise<NotFoundException | entities.FetchCourseDTOEntity> {
    const course = await db.oneOrNone(CourseQuery.fetchCourseById, [payload.course_id]);
    if (!course) {
      return new NotFoundException('Course not found.');
    }

    const userCourseEngagement = await db.oneOrNone(CourseQuery.updateUserCourseEngagement, [payload.course_id, payload.user_id]);

    await this.courseStats(payload.course_id);

    return userCourseEngagement;
  };


  public async fetchUserCourseInformation(
    user_id: string
  ): Promise<NotFoundException |  entities.UserData> {
    const user = await db.oneOrNone(CourseQuery.fetchUserCourseData, [user_id]);
    if (!user) {
      return new NotFoundException('No courses found for these User.');
    }
    return user;
  };


  public async getAvailableCourses() {
    const courses = await db.oneOrNone(CourseQuery.getCourses);
      return courses;
  }

  async getMaxPopularity() {
    const maxCourses = await db.oneOrNone(CourseQuery.getMaxPopularity);
    return maxCourses;
  }

  async calculateInterestScore(course: entities.CourseEntity, userData: entities.UserData): Promise<number> {
  const courseTags = new Set(course.tags);
  const userInterests = new Set(userData.interests);

  if (courseTags.size === 0 || userInterests.size === 0) return 0;

  const intersection = [...courseTags].filter(tag => userInterests.has(tag)).length;
  const union = new Set([...courseTags, ...userInterests]).size;

  return union === 0 ? 0 : intersection / union;
}

async calculateEngagementScore(course: entities.CourseEntity, userData: entities.UserData): Promise<number> {
  const engagement = userData.engagement[course.id] || {};
  const maxScrollTime = 300;
  if (!engagement.total_scroll_time) return 0.1;
  const scrollScore = Math.min(engagement.total_scroll_time / maxScrollTime, 1);
  return scrollScore;
}

async calculateFrequencyScore(course: entities.CourseEntity, userData: entities.UserData): Promise<number> {
  const engagement = userData.engagement[course.id] || {};
  if (!engagement.view_count || engagement.view_count === 0) return 0.1;
  return Math.log(engagement.view_count + 1) / Math.log(10);
}

async calculatePopularityScore(course: entities.CourseEntity): Promise<number> {
  const maxPopularity = await this.getMaxPopularity();
  return maxPopularity > 0 ? course.popularity_score / maxPopularity : 0;
}

async calculateRecencyScore(course: entities.CourseEntity, userData: entities.UserData): Promise<number> {
  const engagement = userData.engagement[course.id] || {};
  if (!engagement.last_viewed_at) return 0.1;

  const daysSinceLastView =
    (Date.now() - new Date(engagement.last_viewed_at).getTime()) /
    (1000 * 60 * 60 * 24);

  return Math.exp(-daysSinceLastView / 7);
}
async calculateCourseScore(course: entities.CourseEntity, userData: entities.UserData): Promise<number> {
  const [interestScore, engagementScore, frequencyScore, popularityScore, recencyScore] =
    await Promise.all([
      this.calculateInterestScore(course, userData),
      this.calculateEngagementScore(course, userData),
      this.calculateFrequencyScore(course, userData),
      this.calculatePopularityScore(course),
      this.calculateRecencyScore(course, userData),
    ]);

  return (
    interestScore * this.weights.personalInterest +
    engagementScore * this.weights.engagement +
    frequencyScore * this.weights.viewFrequency +
    popularityScore * this.weights.coursePopularity +
    recencyScore * this.weights.recency
  );
}

getMatchReasons (course:entities.CourseEntity, userData:entities.UserData, score: number) {
    const reasons = [];
    
    const commonInterests = course.tags.filter(tag => 
        userData.interests.includes(tag));
    if (commonInterests.length > 0) {
        reasons.push(`Matches your interests in: ${commonInterests.join(', ')}`);
    }
    
    const engagement = userData.engagement[course.id];
    if (engagement && engagement.view_count && engagement.view_count > 0) {
      reasons.push(`You've viewed this course ${engagement.view_count} times`);
    }
    
    if (course.popularity_score > 80) {
        reasons.push('Highly popular among other learners');
    }
    
  if (score > 0.7) {
    reasons.push('Strong overall match for you');
  }
    return reasons;
}

public async UserCoursesRecommendation(payload: dtos.RecommendationDTO): Promise<NotFoundException | entities.CourseRecommendationEntity[]>  {
    try {
      const {user_id  , limit = 3} = payload;
        const userData = await this.fetchUserCourseInformation(user_id);

        if (userData instanceof NotFoundException) {
          throw userData;
        }
        const allCourses: entities.CourseEntity[] = await this.getAvailableCourses();

        const scoredCourses = await Promise.all(
          allCourses.map(async (course: entities.CourseEntity) => ({
            course,
            score: await this.calculateCourseScore(course, userData as entities.UserData)
          }))
        );

        return scoredCourses
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => ({
                id: item.course.id,
                title: item.course.title,
                description: item.course.description,
                category: item.course.category,
                score: item.score,
                match_reasons: this.getMatchReasons(item.course, userData, item.score)
            }));
    } catch (error) {
        throw error;
    }
}



}



const courseRepository = new CourseRepositoryImpl( );

export default courseRepository;
