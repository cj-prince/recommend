import * as dtos from './dto';
import * as entities from './entities';
import CourseRepository from './repositories';
import { CourseInterface } from './interface';
import {
  NotFoundException
} from '../../shared/lib/errors';
import {
  FetchPaginatedResponse,
} from '../../shared/helpers';

export class CourseServiceImpl implements CourseInterface {
  constructor(
   
  ) {}

  public fetchCourses = async (
    payload:dtos.CourseDTO
  ): Promise<FetchPaginatedResponse> => {
    const response = await CourseRepository.fetchCourses(payload);
    return response;
  };

  public userCoursesEngagement = async (
    payload: dtos.UserCourseEngagementDTO
  ): Promise<NotFoundException | entities.FetchCourseDTOEntity> => {
    const response = await CourseRepository.userCoursesEngagement(payload);
    return response;
  };

  public updateUserCoursesEngagement = async (
    payload: dtos.UserCourseEngagementDTO
  ): Promise<NotFoundException | entities.FetchCourseDTOEntity> => {
    const response = await CourseRepository.updateUserCoursesEngagement(payload);
    return response;
  };

}

const CourseService = new CourseServiceImpl(
);

export default CourseService;
