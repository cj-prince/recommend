import { Router } from 'express';
import * as authValidator from './validator';
import authenticationController from './controller';
import { WatchAsyncController } from '../../shared/utils/watch-async-controller';
import { validateDataMiddleware } from '../../shared/middlewares/request-validator.middleware';

const authenticationRouter = Router();


authenticationRouter.get(
  '/categories',
  WatchAsyncController(authenticationController.fetchCategories)
);

authenticationRouter.post(
  '/users/signup',
  validateDataMiddleware(authValidator.userGetStartedPayloadValidatorSchema, 'body'),
  WatchAsyncController(authenticationController.userSignup)
);


authenticationRouter.post(
  '/users/login',
  validateDataMiddleware(authValidator.userLoginPayloadValidatorSchema, 'body'),
  WatchAsyncController(authenticationController.userLogin)
);


export default authenticationRouter;
