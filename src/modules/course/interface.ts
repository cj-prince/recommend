import * as dtos from './dto';
// import * as CourseEntities from './entities';
// import {
//   BadException,
// } from '../../shared/lib/errors';
import {
  FetchPaginatedResponse,
} from '../../shared/helpers';

export interface CourseInterface {
  fetchCourses(payload:dtos.CourseDTO): Promise<FetchPaginatedResponse>;
};
