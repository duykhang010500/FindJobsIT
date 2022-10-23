import { GetMyCV, GetMyCVSuccess, GetMyCVFailure } from './types';
import { GET_MY_CV, GET_MY_CV_FAILURE, GET_MY_CV_SUCCESS } from './actionTypes';

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
