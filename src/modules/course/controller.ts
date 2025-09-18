import { StatusCodes } from 'http-status-codes';
import * as dtos from './dto';
import { fnRequest } from '../../shared/types';
import  CourseController from './services';
import * as Response from '../../shared/lib/api-response';
import { User } from '../../shared/interface';
import {
  NotFoundException,
} from '../../shared/lib/errors';

export class CourseControllerImpl {

  public fetchCourses: fnRequest = async (req, res) => {
    const payload = new dtos.CourseDTO(req.body);
    const response = await  CourseController.fetchCourses(payload);
    return Response.success(res, 'Successfully fetched courses.', StatusCodes.OK, response);
  };


  public userCoursesEngagement: fnRequest = async (req, res) => {
    const { id } = req.user as User;
    const payload = new dtos.UserCourseEngagementDTO(req.body);
    payload.user_id = id;
    const response = await CourseController.userCoursesEngagement(payload);
    if (response instanceof NotFoundException) {
      return Response.error(res, response, StatusCodes.BAD_REQUEST);
    }
    return Response.success(res, 'Successfully signup.', StatusCodes.CREATED, response);
  };

  public updateUserCoursesEngagement: fnRequest = async (req, res) => {
    const { id } = req.user as User;
    const payload = new dtos.UserCourseEngagementDTO(req.body);
    payload.user_id = id;
    const response = await CourseController.updateUserCoursesEngagement(payload);
    if (response instanceof NotFoundException) {
      return Response.error(res, response, StatusCodes.BAD_REQUEST);
    }
    return Response.success(res, 'Successfully updated user engagement.', StatusCodes.CREATED, response);
  };

}

const courseController = new CourseControllerImpl();

export default courseController;
