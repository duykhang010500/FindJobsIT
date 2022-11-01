import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  DELETE_SAVED_CANDIDATE,
  DELETE_SAVED_CANDIDATE_FAILURE,
  DELETE_SAVED_CANDIDATE_SUCCESS,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_CANDIDATE_FAILURE,
  GET_DETAIL_CANDIDATE_SUCCESS,
  GET_DETAIL_RESUME_CANDIDATE,
  GET_DETAIL_RESUME_CANDIDATE_FAILURE,
  GET_DETAIL_RESUME_CANDIDATE_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  GET_SAVED_CANDIDATES,
  GET_SAVED_CANDIDATES_FAILURE,
  GET_SAVED_CANDIDATES_SUCCESS,
  SAVE_CANDIDATE,
  SAVE_CANDIDATE_FAILURE,
  SAVE_CANDIDATE_SUCCESS,
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
  resume: null | any;
  savedCandidates: null | any;
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

export type GetDetailResumeCandidate = {
  type: typeof GET_DETAIL_RESUME_CANDIDATE;
  payload: any;
};

export type GetDetailResumeCandidateSuccess = {
  type: typeof GET_DETAIL_RESUME_CANDIDATE_SUCCESS;
  payload: any;
};

export type GetDetailResumeCandidateFailure = {
  type: typeof GET_DETAIL_RESUME_CANDIDATE_FAILURE;
  payload: any;
};

export type SaveCandidate = {
  type: typeof SAVE_CANDIDATE;
  payload: any;
};

export type SaveCandidateSuccess = {
  type: typeof SAVE_CANDIDATE_SUCCESS;
  payload: any;
};

export type SaveCandidateFailure = {
  type: typeof SAVE_CANDIDATE_FAILURE;
  payload: any;
};

export type GetSavedCandidates = {
  type: typeof GET_SAVED_CANDIDATES;
  payload: any;
};

export type GetSavedCandidatesSuccess = {
  type: typeof GET_SAVED_CANDIDATES_SUCCESS;
  payload: any;
};

export type GetSavedCandidatesFailure = {
  type: typeof GET_SAVED_CANDIDATES_FAILURE;
  payload: any;
};

export type DeleteSavedCandidate = {
  type: typeof DELETE_SAVED_CANDIDATE;
  payload: any;
};

export type DeleteSavedCandidateSuccess = {
  type: typeof DELETE_SAVED_CANDIDATE_SUCCESS;
  payload: any;
};

export type DeleteSavedCandidateFailure = {
  type: typeof DELETE_SAVED_CANDIDATE_FAILURE;
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
  | SearchCandidatesSuccess
  | GetDetailResumeCandidate
  | GetDetailResumeCandidateSuccess
  | GetDetailResumeCandidateFailure
  | SaveCandidate
  | SaveCandidateSuccess
  | SaveCandidateFailure
  | GetSavedCandidates
  | GetSavedCandidatesSuccess
  | GetSavedCandidatesFailure
  | DeleteSavedCandidate
  | DeleteSavedCandidateSuccess
  | DeleteSavedCandidateFailure;
