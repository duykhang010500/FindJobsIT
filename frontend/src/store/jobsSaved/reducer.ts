import { boolean } from 'yup';
import {
  GET_JOBS_SAVED,
  GET_JOBS_SAVED_FAILURE,
  GET_JOBS_SAVED_SUCCESS,
  SAVE_JOB,
  SAVE_JOB_FAILURE,
  SAVE_JOB_SUCCESS,
} from './actionTypes';
import { JobsSavedAction } from './types';

interface JobSaved {
  isLoading: boolean;
  list: any;
}

const initialState = {
  isLoading: false,
  list: [],
};

const jobsSavedReducer = (state = initialState, action: JobsSavedAction) => {
  switch (action.type) {
    case SAVE_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case SAVE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SAVE_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_JOBS_SAVED:
      return {
        ...state,
        isLoading: true,
      };
    case GET_JOBS_SAVED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case GET_JOBS_SAVED_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default jobsSavedReducer;
