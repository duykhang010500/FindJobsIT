import {
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
} from './actionTypes';

export interface IAuthState {
  isLoading: boolean;
  currentUser?: string;
  error?: null;
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

export type AuthActions =
  | RegisterEmployer
  | RegisterEmployerSuccess
  | RegisterEmployerFailure;
