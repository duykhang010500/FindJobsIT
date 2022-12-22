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
  SET_IS_LOADING,
  UPDATE_CV_TYPE,
  UPDATE_CV_TYPE_FAILURE,
  UPDATE_CV_TYPE_SUCCESS,
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

export const updateCVType = (cv_type: number) => ({
  type: UPDATE_CV_TYPE,
  payload: cv_type,
});

export const updateCVTypeSuccess = () => ({
  type: UPDATE_CV_TYPE_SUCCESS,
});

export const updateCVTypeFailure = (err: any) => ({
  type: UPDATE_CV_TYPE_FAILURE,
  payload: err,
});

export const setIsLoadingSubmitOnlineProfile = () => ({
  type: SET_IS_LOADING,
});
