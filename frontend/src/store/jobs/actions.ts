import {
  APPLY_JOB,
  APPLY_JOB_SUCCESS,
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS,
  EMPLOYER_GET_JOBS_SUCCESS,
  GET_JOB,
  GET_JOBS,
  GET_JOBS_SUCCESS,
  GET_JOB_SUCCESS,
  SEARCH_JOB,
  SEARCH_JOB_SUCCESS,
  UPDATE_JOB,
} from './actionTypes';

export const createJob = (formData: any, navigate: any) => ({
  type: CREATE_JOB,
  payload: { formData, navigate },
});

export const createJobSuccess = () => ({
  type: CREATE_JOB_SUCCESS,
});

export const createJobFailure = (err: any) => ({
  type: CREATE_JOB_FAILURE,
  payload: err,
});

export const getJobs = () => ({
  type: GET_JOBS,
});

export const getJob = (id: any) => {
  return {
    type: GET_JOB,
    payload: id,
  };
};

export const getJobSuccess = (job: any) => {
  return {
    type: GET_JOB_SUCCESS,
    payload: job,
  };
};

export const getJobsSuccess = (jobs: any) => ({
  type: GET_JOBS_SUCCESS,
  payload: jobs,
});

export const employerGetJobs = () => ({
  type: EMPLOYER_GET_JOBS,
});

export const employerGetJobsSuccess = (jobs: any) => ({
  type: EMPLOYER_GET_JOBS_SUCCESS,
  payload: jobs,
});

export const updateJob = (id: any, formData: any) => {
  return {
    type: UPDATE_JOB,
    payload: {
      id,
      formData,
    },
  };
};

export const applyJob = (id: any, formData: any) => ({
  type: APPLY_JOB,
  payload: {
    id,
    formData,
  },
});

export const applyJobSuccess = () => {
  return {
    type: APPLY_JOB_SUCCESS,
  };
};

export const searchJobs = (keywords: any, locations: any, industries: any) => {
  return {
    type: SEARCH_JOB,
    payload: {
      keywords,
      locations,
      industries,
    },
  };
};

export const searchJobsSuccess = (jobs: any) => {
  return {
    type: SEARCH_JOB_SUCCESS,
    payload: jobs,
  };
};
