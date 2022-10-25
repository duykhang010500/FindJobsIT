import {
  GetMyCV,
  GetMyCVSuccess,
  GetMyCVFailure,
  UpdateMyCv,
  UpdateMyCvFailure,
} from './types';
import {
  GET_MY_CV,
  GET_MY_CV_FAILURE,
  GET_MY_CV_SUCCESS,
  UPDATE_MY_CV,
  UPDATE_MY_CV_FAILURE,
} from './actionTypes';

export const getMyCV = (): GetMyCV => {
  return {
    type: GET_MY_CV,
  };
};

export const getMyCVSuccess = (cv: any): GetMyCVSuccess => {
  return {
    type: GET_MY_CV_SUCCESS,
    payload: cv,
  };
};

export const getMyCVFailure = (err?: any): GetMyCVFailure => {
  return {
    type: GET_MY_CV_FAILURE,
    payload: err,
  };
};

export const updateMyCv = (formData: any): UpdateMyCv => ({
  type: UPDATE_MY_CV,
  payload: formData,
});

export const updateMyCvFailure = (err: any): UpdateMyCvFailure => ({
  type: UPDATE_MY_CV_FAILURE,
  payload: err,
});
