import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  DELETE_SAVED_CANDIDATE,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_CANDIDATE_FAILURE,
  GET_DETAIL_CANDIDATE_SUCCESS,
  GET_DETAIL_RESUME_CANDIDATE,
  GET_DETAIL_RESUME_CANDIDATE_FAILURE,
  GET_DETAIL_RESUME_CANDIDATE_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  GET_SAVED_CANDIDATES,
  GET_SAVED_CANDIDATES_SUCCESS,
  SAVE_CANDIDATE,
  SEARCH_CANDIDATES,
  SEARCH_CANDIDATES_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
} from './actionTypes';

export const getListCandidatesForEmployer = () => ({
  type: GET_LIST_CANDIDATES_FOR_EMPLOYER,
});

export const getListCandidatesForEmployerSuccess = (list: any) => ({
  type: GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  payload: list,
});

export const adminGetCandidatesList = () => {
  return {
    type: ADMIN_GET_CANDIDATES_LIST,
  };
};

export const adminGetCandidatesListSuccess = (list: any) => {
  return {
    type: ADMIN_GET_CANDIDATES_LIST_SUCCESS,
    payload: list,
  };
};

export const adminGetCandidatesListFailure = () => {
  return {
    type: ADMIN_GET_CANDIDATES_LIST_FAILURE,
  };
};

export const updateStatus = (id: any, formData: any) => {
  return {
    type: UPDATE_STATUS,
    payload: {
      id,
      formData,
    },
  };
};

export const updateStatusSuccess = () => {
  return {
    type: UPDATE_STATUS_SUCCESS,
  };
};

export const updateStatusFailure = (err: any) => {
  return {
    type: UPDATE_STATUS_FAILURE,
    payload: err,
  };
};

export const getDetailCandidate = (id: number) => {
  return {
    type: GET_DETAIL_CANDIDATE,
    payload: id,
  };
};

export const getDetailCandidateSuccess = (candidate: any) => {
  return {
    type: GET_DETAIL_CANDIDATE_SUCCESS,
    payload: candidate,
  };
};

export const getDetailCandidateFailure = (err: any) => {
  return {
    type: GET_DETAIL_CANDIDATE_FAILURE,
    payload: err,
  };
};

export const searchCandidate = (params: any) => {
  return {
    type: SEARCH_CANDIDATES,
    payload: params,
  };
};

export const searchCandidateSuccess = (candidates: any) => {
  return {
    type: SEARCH_CANDIDATES_SUCCESS,
    payload: candidates,
  };
};

export const getDetailResumeCandidate = (id: number) => {
  return {
    type: GET_DETAIL_RESUME_CANDIDATE,
    payload: id,
  };
};

export const getDetailResumeCandidateSuccess = (resume: any) => {
  return {
    type: GET_DETAIL_RESUME_CANDIDATE_SUCCESS,
    payload: resume,
  };
};

export const getDetailResumeCandidateFailure = (err: any) => {
  return {
    type: GET_DETAIL_RESUME_CANDIDATE_FAILURE,
    payload: err,
  };
};

export const saveCandidate = (id: any) => {
  return {
    type: SAVE_CANDIDATE,
    payload: id,
  };
};

export const getSavedCandidates = () => {
  return {
    type: GET_SAVED_CANDIDATES,
  };
};

export const getSavedCandidatesSuccess = (list: any) => {
  return {
    type: GET_SAVED_CANDIDATES_SUCCESS,
    payload: list,
  };
};

export const deleteSavedCandidate = (id: any) => {
  return {
    type: DELETE_SAVED_CANDIDATE,
    payload: id,
  };
};
