import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_CANDIDATE_FAILURE,
  GET_DETAIL_CANDIDATE_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  SEARCH_CANDIDATES,
  SEARCH_CANDIDATES_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
} from './actionTypes';

export interface ICandidatesState {
  isLoading: boolean;
  list: any[];
  candidate: null | any;
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

export type UpdateStatusFailure = {
  type: typeof UPDATE_STATUS_FAILURE;
  payload: any;
};

export type GetCandidate = {
  type: typeof GET_DETAIL_CANDIDATE;
  payload: number;
};

export type GetCandidateSuccess = {
  type: typeof GET_DETAIL_CANDIDATE_SUCCESS;
  payload: any;
};

export type GetCandidateFailure = {
  type: typeof GET_DETAIL_CANDIDATE_FAILURE;
  payload: any;
};

export type SearchCandidates = {
  type: typeof SEARCH_CANDIDATES;
  payload: any;
};

export type SearchCandidatesSuccess = {
  type: typeof SEARCH_CANDIDATES_SUCCESS;
  payload: any;
};

export type CandidatesActions =
  | GetListCandidatesForEmployer
  | GetListCandidatesForEmployerSuccess
  | AdminGetCandidatesList
  | AdminGetCandidatesListSuccess
  | AdminGetCandidatesListFailure
  | UpdateStatus
  | UpdateStatusSuccess
  | UpdateStatusFailure
  | GetCandidate
  | GetCandidateSuccess
  | GetCandidateFailure
  | SearchCandidates
  | SearchCandidatesSuccess;
