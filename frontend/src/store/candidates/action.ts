import {
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
} from './actionTypes';

export const getListCandidatesForEmployer = () => ({
  type: GET_LIST_CANDIDATES_FOR_EMPLOYER,
});

export const getListCandidatesForEmployerSuccess = (list: any) => ({
  type: GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  payload: list,
});
