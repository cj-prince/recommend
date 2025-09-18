import { BaseEntity } from '../../shared/utils/base-entity';
export class FetchCourseDTOEntity extends BaseEntity<FetchCourseDTOEntity> {
  id: string;
  name: string;
  description: string;
}