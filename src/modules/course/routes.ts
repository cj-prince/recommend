import { Router } from 'express';
import * as courseValidator from './validator';
import  CourseController from './controller';
import { WatchAsyncController } from '../../shared/utils/watch-async-controller';
import { validateDataMiddleware } from '../../shared/middlewares/request-validator.middleware';
import * as AuthenticationMiddleware from '../../shared/middlewares/auth.middleware';


const courseRouter = Router();


courseRouter.get(
  '/',
  AuthenticationMiddleware.verifyAuthTokenMiddleware,
  validateDataMiddleware(courseValidator.coursePayloadValidatorSchema, 'query'),
  WatchAsyncController(CourseController.fetchCourses)
);

courseRouter.post(
  '/user/engagement',
  AuthenticationMiddleware.verifyAuthTokenMiddleware,
  validateDataMiddleware(courseValidator.userEngagementPayloadValidatorSchema, 'body'),
  WatchAsyncController(CourseController.userCoursesEngagement)
);

courseRouter.patch(
  '/user/engagement',
  AuthenticationMiddleware.verifyAuthTokenMiddleware,
  validateDataMiddleware(courseValidator.userEngagementPayloadValidatorSchema, 'body'),
  WatchAsyncController(CourseController.updateUserCoursesEngagement)
);

courseRouter.get(
  '/user/recommendations',
  AuthenticationMiddleware.verifyAuthTokenMiddleware,
  validateDataMiddleware(courseValidator.recommendationPayloadValidatorSchema, 'query'),
  WatchAsyncController(CourseController.UserCoursesRecommendation)
);



export default courseRouter;
