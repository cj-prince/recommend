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

    const userCourseEngagement = await db.oneOrNone(CourseQuery.updateUserCourseEngagement, [payload.course_id, payload.user_id]);

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
}



const courseRepository = new CourseRepositoryImpl( );

export default courseRepository;
