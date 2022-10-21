import {
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
} from './actionTypes';
import { IJobsState, JobsAction } from './types';

const initialState: IJobsState = {
  job: null,
  jobs: [],
  error: null,
  isLoading: false,
};

const JobsReducer = (state = initialState, action: JobsAction) => {
  switch (action.type) {
    case CREATE_JOB:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CREATE_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default JobsReducer;
