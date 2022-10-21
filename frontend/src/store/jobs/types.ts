import {
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
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

export type JobsAction = CreateJob | CreateJobSuccess | CreateJobFailure;
