import {
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS,
  EMPLOYER_GET_JOBS_SUCCESS,
  GET_JOB,
  GET_JOBS,
  GET_JOBS_SUCCESS,
  GET_JOB_SUCCESS,
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
