import {
  APPLY_JOB,
  // APPLY_JOB_FAILURE,
  APPLY_JOB_SUCCESS,
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_DELETE_JOB,
  EMPLOYER_DELETE_JOB_FAILURE,
  EMPLOYER_DELETE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS,
  EMPLOYER_GET_JOBS_SUCCESS,
  GET_JOB,
  GET_JOBS,
  GET_JOBS_APPLIED,
  GET_JOBS_APPLIED_FAILURE,
  GET_JOBS_APPLIED_SUCCESS,
  GET_JOBS_SUCCESS,
  GET_JOB_SUCCESS,
  GET_PENDING_JOBS,
  GET_PENDING_JOBS_FAILURE,
  GET_PENDING_JOBS_SUCCESS,
  SEARCH_JOB,
  SEARCH_JOB_SUCCESS,
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_SUCCESS,
} from './actionTypes';
import { IJobsState, JobsAction } from './types';

const initialState: IJobsState = {
  job: null,
  jobs: [],
  error: null,
  isLoading: false,
  jobsSearch: [],
  pendingJobs: [],
  activeJobs: [],
  rejectedJobs: [],
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
    case UPDATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UPDATE_JOB_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case EMPLOYER_DELETE_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EMPLOYER_DELETE_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_JOBS: {
      return {
        ...state,
        isLoading: true,
      };
    }
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
    case EMPLOYER_GET_JOBS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EMPLOYER_GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case APPLY_JOB:
      return {
        ...state,
      };
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SEARCH_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_JOB_SUCCESS:
      return {
        ...state,
        jobsSearch: action.payload,
        isLoading: false,
      };
    case GET_JOBS_APPLIED:
      return {
        ...state,
        isLoading: true,
      };
    case GET_JOBS_APPLIED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case GET_JOBS_APPLIED_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_PENDING_JOBS:
      return {
        ...state,
      };

    case GET_PENDING_JOBS_SUCCESS:
      return {
        ...state,
        pendingJobs: action.payload,
      };

    case GET_PENDING_JOBS_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default JobsReducer;
