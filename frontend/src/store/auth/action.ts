import {
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_SUCCESS,
  REGISTER_EMPLOYER_FAILURE,
} from './actionTypes';

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
