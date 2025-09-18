import * as dtos from './dto';
import * as entities from './entities';
import { SignedData } from '../../shared/interface';
import AuthenticationRepository from './repositories';
import { AuthenticationInterface } from './interface';
import jwtSigningService from '../../shared/services/jwt';
import hashingService, { HashingService } from '../../shared/services/hashing';
import {
  BadException
} from '../../shared/lib/errors';


export class AuthenticationServiceImpl implements AuthenticationInterface {
  constructor(
    private readonly hashingService: HashingService,
  ) {}

  public fetchCategories = async (
  ): Promise<entities.FetchCategoriesDTOEntity[]> => {
    const response = await AuthenticationRepository.fetchCategories();
    return response;
  };

  public userSignup = async (
    payload: dtos.UserSignupDTO
  ): Promise<BadException | entities.UserSignupDTOEntity> => {
  const  response = await AuthenticationRepository.userSignup(payload);
    if (response instanceof BadException) {
      return response;
    }
    return response;
  };

  public userLogin = async (
    payload: dtos.UserLoginDTO
  ): Promise<BadException | entities.UserEntity> => {
    const response = await AuthenticationRepository.userLogin(payload);
    if (response instanceof BadException) {
      return response;
    }
    const { password } = payload;
    const doesPasswordMatch = await this.hashingService.compare(
      password as string, response.password as string,
    );
    if (!doesPasswordMatch) {
      return new BadException('Invalid login credentials.');
    }
    const signedData: SignedData = {
      id: response.id,
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      user_name: response.user_name,
      phone_number: response.phone_number,
    };
    const token = await jwtSigningService.sign(signedData, { expiresIn: 3600 });
    response.jwt_token = token;
    return response;
  };
}

const AuthenticationServices = new AuthenticationServiceImpl(
  hashingService
);

export default AuthenticationServices;
