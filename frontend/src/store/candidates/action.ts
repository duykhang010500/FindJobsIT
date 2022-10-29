import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_CANDIDATE_FAILURE,
  GET_DETAIL_CANDIDATE_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
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
