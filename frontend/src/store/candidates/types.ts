import {
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
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

export type CandidatesActions =
  | GetListCandidatesForEmployer
  | GetListCandidatesForEmployerSuccess;
