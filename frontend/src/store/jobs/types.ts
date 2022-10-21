import {
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS,
  EMPLOYER_GET_JOBS_SUCCESS,
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

export type EmployerGetJos = {
  type: typeof EMPLOYER_GET_JOBS;
};

export type EmployerGetJobsSucess = {
  type: typeof EMPLOYER_GET_JOBS_SUCCESS;
  payload: any;
};

export type JobsAction =
  | CreateJob
  | CreateJobSuccess
  | CreateJobFailure
  | EmployerGetJos
  | EmployerGetJobsSucess;
