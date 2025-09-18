import * as dtos from './dto';
import * as entities from './entities';
import AuthenticationQuery from './query';
import { db } from '../../config/database';
import { AuthenticationInterface } from './interface';
import hashingService, { HashingService } from '../../shared/services/hashing';
import {
  BadException,
} from '../../shared/lib/errors';

export class AuthenticationRepositoryImpl implements AuthenticationInterface {
  constructor(
    private readonly hashingService: HashingService,
  ) {}

  public async fetchCategories (
  ): Promise<entities.FetchCategoriesDTOEntity[]> {
    const categoriesResult = await db.manyOrNone(AuthenticationQuery.fetchCategories);
    return categoriesResult
  };
public async userSignup(
  payload: dtos.UserSignupDTO
): Promise<BadException | entities.UserSignupDTOEntity> {
  try {
    const response = await db.tx(async (t) => {
      const userExists = await t.oneOrNone(AuthenticationQuery.userCheckByEmail, [payload.email]);
      if (userExists) {
        throw new BadException('User Already Exists.');
      }
      const hashedPassword = await this.hashingService.hash(payload.password);
      const user = await t.one(AuthenticationQuery.userSignup, [
        payload.phone_number,
        payload.first_name,
        payload.last_name,
        payload.user_name,
        payload.email,
        payload.interests,
        hashedPassword
      ]);
      return user;
    });
    
    return response;
  } catch (error) {
    return new BadException(error.message);
  }
}

  public async userLogin(
    payload: dtos.UserLoginDTO
  ): Promise<BadException | entities.UserEntity> {
    const user = await db.oneOrNone(AuthenticationQuery.userLogin, [payload.email]);
    if (!user) {
      return new BadException('Unrecognized User.');
    }
    const data: entities.UserEntity = new entities.UserEntity({
      id: user.id,
      password: user.password,
      phone_number: user.phone_number,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      user_name: user.user_name,
      interests: user.interests,
    });
    return data;
  };
}


const authenticationRepository = new AuthenticationRepositoryImpl( hashingService);

export default authenticationRepository;
