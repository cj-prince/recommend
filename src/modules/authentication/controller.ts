import { StatusCodes } from 'http-status-codes';
import * as dtos from './dto';
import { fnRequest } from '../../shared/types';
import AuthenticationService from './services';
import * as Response from '../../shared/lib/api-response';
import {
  BadException,
} from '../../shared/lib/errors';

export class AuthenticationController {

  public fetchCategories: fnRequest = async (_req, res) => {
    const response = await AuthenticationService.fetchCategories();
    return Response.success(res, 'Successfully completed signup.', StatusCodes.CREATED, response);
  };


  public userSignup: fnRequest = async (req, res) => {
    const payload = new dtos.UserSignupDTO(req.body);
    const response = await AuthenticationService.userSignup(payload);
    if (response instanceof BadException) {
      return Response.error(res, response, StatusCodes.BAD_REQUEST);
    }
    return Response.success(res, 'Successfully signup.', StatusCodes.CREATED, response);
  };

  public userLogin: fnRequest = async (req, res) => {
    const payload = new dtos.UserLoginDTO(req.body);
    const response = await AuthenticationService.userLogin(payload);
    if (response instanceof BadException) {
      return Response.error(res, response, StatusCodes.BAD_REQUEST);
    }
    return Response.success(res, 'Login successfully.', StatusCodes.OK, {
      id: response.id,
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      user_name: response.user_name,
      phone_number: response.phone_number,
      token: response.jwt_token,
    });
  };

}

const authenticationController = new AuthenticationController();

export default authenticationController;
