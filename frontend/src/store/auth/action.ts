import {
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_SUCCESS,
  REGISTER_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_SUCCESS,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_ADMIN,
  LOGIN_ADMIN_SUCCESS,
} from './actionTypes';
import { IUserLogin } from './types';

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

export const loginEmployerFailure = (error: any) => ({
  type: LOGIN_EMPLOYER_FAILURE,
  payload: error,
});

export const loginAdmin = (formData: IUserLogin, navigate: any) => ({
  type: LOGIN_ADMIN,
  payload: { formData, navigate },
});

export const loginAdminSuccess = () => ({
  type: LOGIN_ADMIN_SUCCESS,
});
