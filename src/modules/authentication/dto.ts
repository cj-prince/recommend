import { BaseEntity } from '../../shared/utils/base-entity';
export class UserSignupDTO extends BaseEntity<UserSignupDTO> {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone_number: string;
  interests: string[];
  consent: boolean;
  password: string;
  id: string;
};

export class UserLoginDTO extends BaseEntity<UserLoginDTO> {
  email: string;
  password: string;
};