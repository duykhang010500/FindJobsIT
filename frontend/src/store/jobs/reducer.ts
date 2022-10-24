import {
  APPLY_JOB,
  APPLY_JOB_SUCCESS,
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS_SUCCESS,
  GET_JOB,
  GET_JOBS_SUCCESS,
  GET_JOB_SUCCESS,
  SEARCH_JOB_SUCCESS,
} from './actionTypes';
import { IJobsState, JobsAction } from './types';

const initialState: IJobsState = {
  job: null,
  jobs: [],
  error: null,
  isLoading: false,
  jobsSearch: [],
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
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case GET_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case GET_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        job: action.payload,
      };
    case EMPLOYER_GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
      };
    case APPLY_JOB:
      return {
        ...state,
        // isLoading: true,
      };
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SEARCH_JOB_SUCCESS:
      return {
        ...state,
        jobsSearch: action.payload,
      };
    default:
      return state;
  }
};

export default JobsReducer;
