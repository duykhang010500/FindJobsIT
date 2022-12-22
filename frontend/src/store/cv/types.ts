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
  UPDATE_MY_CV_SUCCESS,
} from './actionTypes';

export interface ICV {
  isLoading: boolean;
  cv: any;
}

export type GetMyCV = {
  type: typeof GET_MY_CV;
};

export type GetMyCVSuccess = {
  type: typeof GET_MY_CV_SUCCESS;
  payload: any;
};

export type GetMyCVFailure = {
  type: typeof GET_MY_CV_FAILURE;
  payload: any;
};

export type UpdateMyCv = {
  type: typeof UPDATE_MY_CV;
  payload: any;
};

export type UpdateMyCvSuccess = {
  type: typeof UPDATE_MY_CV_SUCCESS;
  payload: any;
};

export type UpdateMyCvFailure = {
  type: typeof UPDATE_MY_CV_FAILURE;
  payload: any;
};

export type UpdateCVType = {
  type: typeof UPDATE_CV_TYPE;
  payload: number;
};

export type UpdateCVTypeSuccess = {
  type: typeof UPDATE_CV_TYPE_SUCCESS;
  payload: number;
};

export type UpdateCVTypeFailure = {
  type: typeof UPDATE_CV_TYPE_FAILURE;
  payload: number;
};

export type SetIsLoading = {
  type: typeof SET_IS_LOADING;
};

export type CVActions =
  | GetMyCV
  | GetMyCVSuccess
  | GetMyCVFailure
  | UpdateMyCv
  | UpdateMyCvSuccess
  | UpdateMyCvFailure
  | UpdateCVType
  | UpdateCVTypeSuccess
  | UpdateCVTypeFailure
  | SetIsLoading;
