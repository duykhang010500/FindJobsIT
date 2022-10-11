import { boolean } from 'yup';
import { CREATE_JOB } from './actionTypes';

export interface IJobsState {
  isLoading: boolean;
}

export type CreateJob = {
  type: typeof CREATE_JOB;
};

export type JobsAction = CreateJob;
