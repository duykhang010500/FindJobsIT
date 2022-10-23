import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  UPDATE_STATUS,
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
