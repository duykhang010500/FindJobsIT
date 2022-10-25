import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
} from './actionTypes';

export interface ICandidatesState {
  isLoading: boolean;
  list: any[];
}

export type GetListCandidatesForEmployer = {
  type: typeof GET_LIST_CANDIDATES_FOR_EMPLOYER;
};

export type GetListCandidatesForEmployerSuccess = {
  type: typeof GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS;
  payload: any;
};

export type AdminGetCandidatesList = {
  type: typeof ADMIN_GET_CANDIDATES_LIST;
};
export type AdminGetCandidatesListSuccess = {
  type: typeof ADMIN_GET_CANDIDATES_LIST_SUCCESS;
  payload: any;
};

export type AdminGetCandidatesListFailure = {
  type: typeof ADMIN_GET_CANDIDATES_LIST_FAILURE;
};

export type UpdateStatus = {
  type: typeof UPDATE_STATUS;
  payload: any;
};

export type UpdateStatusSuccess = {
  type: typeof UPDATE_STATUS_SUCCESS;
  payload: any;
};

export type CandidatesActions =
  | GetListCandidatesForEmployer
  | GetListCandidatesForEmployerSuccess
  | AdminGetCandidatesList
  | AdminGetCandidatesListSuccess
  | AdminGetCandidatesListFailure;
