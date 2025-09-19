import { BaseEntity } from '../../shared/utils/base-entity';
export class CourseDTO extends BaseEntity<CourseDTO> {
  limit: string;
  page: string;
  search: string;
};

export class UserCourseEngagementDTO extends BaseEntity<UserCourseEngagementDTO> {
  course_id: string;
  view_count: string;
  last_viewed_at: string;
  user_id: string;
  scroll_time: Number;
};

export class RecommendationDTO extends BaseEntity<RecommendationDTO> {
  limit: number;
  user_id: string;
};

