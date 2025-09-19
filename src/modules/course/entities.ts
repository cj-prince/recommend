import { BaseEntity } from '../../shared/utils/base-entity';
export class FetchCourseDTOEntity extends BaseEntity<FetchCourseDTOEntity> {
  id: string;
  name: string;
  description: string;
}


export class  CourseEntity {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  popularity_score: number;
}

export interface UserEngagement {
  [courseId: string]: {
    total_scroll_time?: number;
    view_count?: number;
    last_viewed_at?: string | Date;
  };
}

export interface UserData {
  id: string;
  interests: string[];
  engagement: UserEngagement;
}

export class CourseRecommendationEntity extends BaseEntity<CourseRecommendationEntity> {
  id: string;
  title: string;
  description: string;
  category: string;
  score: number;
  match_reasons: string[];
}