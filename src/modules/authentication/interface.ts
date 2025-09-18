import * as dtos from './dto';
import * as AuthenticationEntities from './entities';
import {
  BadException,
} from '../../shared/lib/errors';

export interface AuthenticationInterface {
  fetchCategories(): Promise<AuthenticationEntities.FetchCategoriesDTOEntity[]>;
  userSignup(payload: dtos.UserSignupDTO): Promise<BadException | AuthenticationEntities.UserSignupDTOEntity>;
  userLogin(payload: dtos.UserLoginDTO): Promise<BadException | AuthenticationEntities.UserEntity>;
};
