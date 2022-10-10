import {
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER_SUCCESS,
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
} from './actionTypes';

export interface IAuthState {
  isLoading: boolean;
  error?: null;
  accessToken: string | null;
  currentUser?: null;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IEmployerRegister extends IUserLogin {
  fullname: string;
  password_confirmation: string;
  name: string;
  industry_id: number;
  location: string;
  company_size: number;
}

export type RegisterEmployer = {
  type: typeof REGISTER_EMPLOYER;
};

export type RegisterEmployerSuccess = {
  type: typeof REGISTER_EMPLOYER_SUCCESS;
};

export type RegisterEmployerFailure = {
  type: typeof REGISTER_EMPLOYER_FAILURE;
  payload: any;
};

export type LoginEmployer = {
  type: typeof LOGIN_EMPLOYER;
};

export type LoginEmployerSuccess = {
  type: typeof LOGIN_EMPLOYER_SUCCESS;
  payload: any;
};

export type LoginEmployerFailure = {
  type: typeof LOGIN_EMPLOYER_FAILURE;
  payload: any;
};

export type AuthActions =
  | RegisterEmployer
  | RegisterEmployerSuccess
  | RegisterEmployerFailure
  | LoginEmployer
  | LoginEmployerSuccess
  | LoginEmployerFailure;
