import {
  GET_MY_CV,
  GET_MY_CV_FAILURE,
  GET_MY_CV_SUCCESS,
  UPDATE_CV_TYPE,
  UPDATE_CV_TYPE_FAILURE,
  UPDATE_CV_TYPE_SUCCESS,
} from './actionTypes';
import { ICV, CVActions } from './types';

const initialState: ICV = {
  isLoading: false,
  cv: null,
};

const cvReducer = (state = initialState, action: CVActions) => {
  switch (action.type) {
    case GET_MY_CV:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MY_CV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cv: action.payload,
      };
    case GET_MY_CV_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_CV_TYPE:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_CV_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_CV_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default cvReducer;
