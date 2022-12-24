import { openApplyForm } from './actions';
import {
  ADMIN_GET_DETAIL_JOB,
  ADMIN_GET_DETAIL_JOB_SUCCESS,
  APPLY_JOB,
  APPLY_JOB_FAILURE,
  // APPLY_JOB_FAILURE,
  APPLY_JOB_SUCCESS,
  CLOSE_APPLY_FORM,
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_DELETE_JOB,
  EMPLOYER_DELETE_JOB_FAILURE,
  EMPLOYER_DELETE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS,
  EMPLOYER_GET_JOBS_SUCCESS,
  GET_ACTIVE_JOBS,
  GET_ACTIVE_JOBS_FAILURE,
  GET_ACTIVE_JOBS_SUCCESS,
  GET_JOB,
  GET_JOBS,
  GET_JOBS_APPLIED,
  GET_JOBS_APPLIED_FAILURE,
  GET_JOBS_APPLIED_SUCCESS,
  GET_JOBS_SUCCESS,
  GET_JOB_SUCCESS,
  GET_OTHER_JOBS_SUCCESS,
  GET_PENDING_JOBS,
  GET_PENDING_JOBS_FAILURE,
  GET_PENDING_JOBS_SUCCESS,
  GET_REJECTED_JOBS,
  GET_REJECTED_JOBS_FAILURE,
  GET_REJECTED_JOBS_SUCCESS,
  OPEN_APPLY_FORM,
  SEARCH_JOB,
  SEARCH_JOB_SUCCESS,
  // SET_IS_LOADING,
  SET_IS_SUBMIT_FORM,
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_SUCCESS,
} from './actionTypes';
import { IJobsState, JobsAction } from './types';

const initialState: IJobsState = {
  job: null,
  isFetchingDashboard: false,
  openApplyForm: false,
  isSubmitting: false,
  otherJobs: null,
  employerJobs: [],
  jobs: {
    items: [],
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
  },
  appliedJobs: [],
  error: null,
  isLoading: false,
  // jobsSearch: [],
  jobsSearch: {
    items: [],
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
  },
  pendingJobs: [],
  activeJobs: [],
  rejectedJobs: [],
  isLoadingDetailJob: false,
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
        jobs: {
          ...state.jobs,
          items: action.payload.jobs,
          totalItems: action.payload.totalItems,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        },
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
    case GET_OTHER_JOBS_SUCCESS:
      return {
        ...state,
        otherJobs: action.payload,
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
        employerJobs: action.payload,
      };
    case OPEN_APPLY_FORM:
      return {
        ...state,
        openApplyForm: true,
      };
    case CLOSE_APPLY_FORM:
      return {
        ...state,
        openApplyForm: false,
      };

    //apply job
    case SET_IS_SUBMIT_FORM:
      return {
        ...state,
        isSubmitting: true,
      };
    case APPLY_JOB:
      return {
        ...state,
        isSubmitting: true,
      };
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        openApplyForm: false,
      };
    case APPLY_JOB_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        openApplyForm: false,
      };
    case SEARCH_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_JOB_SUCCESS:
      // return {
      //   ...state,
      //   jobsSearch: action.payload,
      //   isLoading: false,
      // };
      return {
        ...state,
        isLoading: false,
        jobsSearch: {
          ...state.jobsSearch,
          items:
            action.payload.currentPage === 1
              ? action.payload.jobs
              : [...state.jobsSearch.items, ...action.payload.jobs],
          totalItems: action.payload.totalItems,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        },
      };
    case GET_JOBS_APPLIED:
      return {
        ...state,
        isFetchingDashboard: true,
      };
    case GET_JOBS_APPLIED_SUCCESS:
      return {
        ...state,
        isFetchingDashboard: false,
        appliedJobs: action.payload,
      };
    case GET_JOBS_APPLIED_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    // pending jobs
    case GET_PENDING_JOBS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PENDING_JOBS_SUCCESS:
      return {
        ...state,
        pendingJobs: action.payload,
        isLoading: false,
      };

    case GET_PENDING_JOBS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    //active jobs
    case GET_ACTIVE_JOBS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ACTIVE_JOBS_SUCCESS:
      return {
        ...state,
        activeJobs: action.payload,
        isLoading: false,
      };
    case GET_ACTIVE_JOBS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    //rejected jobs
    case GET_REJECTED_JOBS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_REJECTED_JOBS_SUCCESS:
      return {
        ...state,
        rejectedJobs: action.payload,
        isLoading: false,
      };
    case GET_REJECTED_JOBS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ADMIN_GET_DETAIL_JOB:
      return {
        ...state,
        isLoadingDetailJob: true,
      };
    case ADMIN_GET_DETAIL_JOB_SUCCESS:
      return {
        ...state,
        isLoadingDetailJob: false,
        job: action.payload,
      };

    default:
      return state;
  }
};

export default JobsReducer;
