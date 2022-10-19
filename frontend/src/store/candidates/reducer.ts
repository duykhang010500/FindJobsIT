import {
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
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
    case ADMIN_GET_CANDIDATES_LIST:
      return {
        ...state,
      };
    case ADMIN_GET_CANDIDATES_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case ADMIN_GET_CANDIDATES_LIST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default candidatesReducer;
