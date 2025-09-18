export interface JwtSignature {
  issuer: string;
  subject: string;
  audience: string;
};

export interface SignedData {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  phone_number?: string;
};

export interface User {
  id: string;
  phone_number?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  user_name?: string;
  created_at?: Date;
};