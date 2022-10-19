import { UserRegister } from './../../models/auth/index';

import {
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_SUCCESS,
  REGISTER_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_SUCCESS,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_ADMIN,
  LOGIN_ADMIN_SUCCESS,
  GET_INFO_EMPLOYER,
  GET_INFO_EMPLOYER_SUCCESS,
  LOGOUT_EMPLOYER,
  REGISTER_JOBSEEKER,
  REGISTER_JOBSEEKER_SUCCESS,
  REGISTER_JOBSEEKER_FAILURE,
  LOGIN_JOBSEEKER,
  LOGIN_JOBSEEKER_SUCCESS,
  LOGIN_JOBSEEKER_FAILURE,
  GET_CURRENT_JOBSEEKER,
  GET_CURRENT_JOBSEEKER_SUCCESS,
  GET_CURRENT_JOBSEEKER_FAILURE,
  GET_INFO_ADMIN,
  GET_INFO_ADMIN_SUCCESS,
  GET_INFO_ADMIN_FAILURE,
  LOGOUT,
} from './actionTypes';
import { IUserLogin } from './types';

//job seeker
export const jobSeekerRegister = (formData: UserRegister, navigate: any) => ({
  type: REGISTER_JOBSEEKER,
  payload: {
    formData,
    navigate,
  },
});

export const jobSeekerRegisterSuccess = () => {
  return {
    type: REGISTER_JOBSEEKER_SUCCESS,
  };
};

export const jobSeekerRegisterFailure = (error: any) => {
  return {
    type: REGISTER_JOBSEEKER_FAILURE,
    payload: error,
  };
};

export const jobSeekerLogin = (formData: any, navigate: any) => ({
  type: LOGIN_JOBSEEKER,
  payload: {
    formData,
    navigate,
  },
});

export const jobSeekerLoginSuccess = () => ({
  type: LOGIN_JOBSEEKER_SUCCESS,
});

export const jobSeekerLoginFailure = (error: any) => ({
  type: LOGIN_JOBSEEKER_FAILURE,
  payload: error,
});

export const getCurrentJobSeeker = () => {
  return {
    type: GET_CURRENT_JOBSEEKER,
  };
};

export const getCurrentJobSeekerSuccess = (user: any) => {
  return {
    type: GET_CURRENT_JOBSEEKER_SUCCESS,
    payload: user,
  };
};

export const getCurrentJobSeekerFailure = () => {
  return {
    type: GET_CURRENT_JOBSEEKER_FAILURE,
  };
};

//employer
export const registerEmployer = (formData: any, navigate: any) => ({
  type: REGISTER_EMPLOYER,
  payload: {
    formData,
    navigate,
  },
});

export const registerEmployerSuccess = () => ({
  type: REGISTER_EMPLOYER_SUCCESS,
});

export const registerEmployerFailure = (error: any) => ({
  type: REGISTER_EMPLOYER_FAILURE,
  payload: error,
});

export const loginEmployer = (formData: IUserLogin, navigate: any) => ({
  type: LOGIN_EMPLOYER,
  payload: {
    formData,
    navigate,
  },
});

export const loginEmployerSuccess = (token: string) => ({
  type: LOGIN_EMPLOYER_SUCCESS,
  payload: token,
});

export const getInfoEmployer = () => ({
  type: GET_INFO_EMPLOYER,
});

export const getInfoEmployerSuccess = (info: any) => ({
  type: GET_INFO_EMPLOYER_SUCCESS,
  payload: info,
});

export const loginEmployerFailure = (error: any) => ({
  type: LOGIN_EMPLOYER_FAILURE,
  payload: error,
});

export const logoutEmployer = () => ({
  type: LOGOUT_EMPLOYER,
});

//admin
export const loginAdmin = (formData: IUserLogin, navigate: any) => ({
  type: LOGIN_ADMIN,
  payload: { formData, navigate },
});

export const loginAdminSuccess = () => ({
  type: LOGIN_ADMIN_SUCCESS,
});

export const getInfoAdmin = () => ({
  type: GET_INFO_ADMIN,
});

export const getInfoAdminSuccess = (info: any) => ({
  type: GET_INFO_ADMIN_SUCCESS,
  payload: info,
});

export const getInfoAdminFailure = () => ({
  type: GET_INFO_ADMIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});
