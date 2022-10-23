import {
  APPLY_JOB,
  APPLY_JOB_FAILURE,
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
} from './actionTypes';

export interface IJobsState {
  isLoading: boolean;
  error: any;
  job: any;
  jobs: any;
}

export type CreateJob = {
  type: typeof CREATE_JOB;
};

export type CreateJobSuccess = {
  type: typeof CREATE_JOB_SUCCESS;
};

export type CreateJobFailure = {
  type: typeof CREATE_JOB_FAILURE;
  payload: any;
};

export type GetJobs = {
  type: typeof GET_JOBS;
};

export type GetJobsSuccess = {
  type: typeof GET_JOBS_SUCCESS;
  payload: any;
};

export type GetJob = {
  type: typeof GET_JOB;
};

export type GetJobSuccess = {
  type: typeof GET_JOB_SUCCESS;
  payload: any;
};

export type EmployerGetJos = {
  type: typeof EMPLOYER_GET_JOBS;
};

export type EmployerGetJobsSucess = {
  type: typeof EMPLOYER_GET_JOBS_SUCCESS;
  payload: any;
};

export type ApplyJob = {
  type: typeof APPLY_JOB;
  payload: any;
};

export type ApplyJobSuccess = {
  type: typeof APPLY_JOB_SUCCESS;
};

export type ApplyJobFailure = {
  type: typeof APPLY_JOB_FAILURE;
};

export type JobsAction =
  | CreateJob
  | CreateJobSuccess
  | CreateJobFailure
  | GetJobs
  | GetJobsSuccess
  | GetJob
  | GetJobSuccess
  | EmployerGetJos
  | EmployerGetJobsSucess
  | ApplyJob
  | ApplyJobSuccess
  | ApplyJobFailure;
