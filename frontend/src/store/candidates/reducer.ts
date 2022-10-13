import {
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
} from './actionTypes';
import { ICandidatesState, CandidatesActions } from './types';

const initialState: ICandidatesState = {
  isLoading: false,
  list: [],
};

const candidatesReducer = (state = initialState, action: CandidatesActions) => {
  switch (action.type) {
    case GET_LIST_CANDIDATES_FOR_EMPLOYER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default candidatesReducer;
