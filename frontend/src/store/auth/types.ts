import {
  GET_CURRENT_JOBSEEKER_SUCCESS,
  GET_INFO_ADMIN,
  GET_INFO_ADMIN_FAILURE,
  GET_INFO_ADMIN_SUCCESS,
  GET_INFO_EMPLOYER,
  GET_INFO_EMPLOYER_SUCCESS,
  LOGIN_ADMIN,
  LOGIN_ADMIN_FAILURE,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER_SUCCESS,
  LOGIN_JOBSEEKER,
  LOGIN_JOBSEEKER_FAILURE,
  LOGIN_JOBSEEKER_SUCCESS,
  LOGOUT,
  LOGOUT_EMPLOYER,
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
  REGISTER_JOBSEEKER,
  REGISTER_JOBSEEKER_FAILURE,
  REGISTER_JOBSEEKER_SUCCESS,
  UPDATE_INFO_EMPLOYER,
  UPDATE_INFO_EMPLOYER_FAILURE,
  UPDATE_INFO_EMPLOYER_SUCCESS,
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

//job seeker
export type RegisterJobSeeker = {
  type: typeof REGISTER_JOBSEEKER;
};

export type RegisterJobSeekerSuccess = {
  type: typeof REGISTER_JOBSEEKER_SUCCESS;
  payload: any;
};

export type RegisterJobSeekerFailure = {
  type: typeof REGISTER_JOBSEEKER_FAILURE;
  payload: any;
};

export type JobSeekerLogin = {
  type: typeof LOGIN_JOBSEEKER;
};

export type JobSeekerLoginSuccess = {
  type: typeof LOGIN_JOBSEEKER_SUCCESS;
};

export type JobSeekerLoginFailure = {
  type: typeof LOGIN_JOBSEEKER_FAILURE;
  payload: any;
};

export type GetCurrentJobSeekerSuccess = {
  type: typeof GET_CURRENT_JOBSEEKER_SUCCESS;
  payload: any;
};

//employer
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

export type GetEmployerInfoSuccess = {
  type: typeof GET_INFO_EMPLOYER_SUCCESS;
  payload: any;
};

export type LoginEmployerFailure = {
  type: typeof LOGIN_EMPLOYER_FAILURE;
  payload: any;
};

export type LogoutEmployer = {
  type: typeof LOGOUT_EMPLOYER;
};

export type UpdateInfoEmployer = {
  type: typeof UPDATE_INFO_EMPLOYER;
  payload: any;
};
export type UpdateInfoEmployerSuccess = {
  type: typeof UPDATE_INFO_EMPLOYER_SUCCESS;
};

export type UpdateInfoEmployerFailure = {
  type: typeof UPDATE_INFO_EMPLOYER_FAILURE;
  payload: any;
};

//admin
export type LoginAdmin = {
  type: typeof LOGIN_ADMIN;
};

export type LoginAminSuccess = {
  type: typeof LOGIN_ADMIN_SUCCESS;
  payload: any;
};

export type LoginAdminFailure = {
  type: typeof LOGIN_ADMIN_FAILURE;
  payload: any;
};

export type GetInfoAdmin = {
  type: typeof GET_INFO_ADMIN;
};

export type GetInfoAdminSuccess = {
  type: typeof GET_INFO_ADMIN_SUCCESS;
  payload: any;
};

export type GetInfoAdminFailure = {
  type: typeof GET_INFO_ADMIN_FAILURE;
};

export type Logout = {
  type: typeof LOGOUT;
};

export type AuthActions =
  | RegisterJobSeeker
  | RegisterJobSeekerSuccess
  | RegisterJobSeekerFailure
  | JobSeekerLogin
  | JobSeekerLoginSuccess
  | JobSeekerLoginFailure
  | GetCurrentJobSeekerSuccess
  | RegisterEmployer
  | RegisterEmployerSuccess
  | RegisterEmployerFailure
  | LoginEmployer
  | LoginEmployerSuccess
  | LoginEmployerFailure
  | GetEmployerInfoSuccess
  | UpdateInfoEmployer
  | UpdateInfoEmployerSuccess
  | UpdateInfoEmployerFailure
  | LoginAdmin
  | LoginAminSuccess
  | LoginAdminFailure
  | LogoutEmployer
  | GetInfoAdmin
  | GetInfoAdminSuccess
  | GetInfoAdminFailure
  | Logout;
