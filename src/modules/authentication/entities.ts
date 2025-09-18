import { BaseEntity } from '../../shared/utils/base-entity';
export class UserEntity extends BaseEntity<UserEntity> {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  password?: string;
  phone_number?: string;
  interests: string[];
  jwt_token?: string;
};


export class UserSignupDTOEntity extends BaseEntity<UserSignupDTOEntity> {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone_number: string;
  interests: string[];
};

export class FetchCategoriesDTOEntity extends BaseEntity<FetchCategoriesDTOEntity> {
  id: string;
  name: string;
  description: string;
}