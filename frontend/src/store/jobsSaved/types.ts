import {
  GET_JOBS_SAVED,
  GET_JOBS_SAVED_FAILURE,
  GET_JOBS_SAVED_SUCCESS,
  SAVE_JOB,
  SAVE_JOB_FAILURE,
  SAVE_JOB_SUCCESS,
  DELETE_JOBS_SAVED,
  DELETE_JOBS_SAVED_FAILURE,
  DELETE_JOBS_SAVED_SUCCESS,
} from './actionTypes';

export type SaveJob = {
  type: typeof SAVE_JOB;
  payload: any;
};

export type SaveJobSuccess = {
  type: typeof SAVE_JOB_SUCCESS;
  payload: any;
};

export type SaveJobFailure = {
  type: typeof SAVE_JOB_FAILURE;
  payload: any;
};

export type GetJobsSaved = {
  type: typeof GET_JOBS_SAVED;
};

export type GetJobsSavedSuccess = {
  type: typeof GET_JOBS_SAVED_SUCCESS;
  payload: any;
};

export type GetJobsSavedFailure = {
  type: typeof GET_JOBS_SAVED_FAILURE;
};

export type DeleteJobsSaved = {
  type: typeof DELETE_JOBS_SAVED;
  payload: any;
};

export type DeleteJobsSavedSuccess = {
  type: typeof DELETE_JOBS_SAVED_SUCCESS;
  payload: any;
};

export type DeleteJobsSavedFailure = {
  type: typeof DELETE_JOBS_SAVED_FAILURE;
};

export type JobsSavedAction =
  | SaveJob
  | SaveJobSuccess
  | SaveJobFailure
  | GetJobsSaved
  | GetJobsSavedSuccess
  | GetJobsSavedFailure
  | DeleteJobsSaved
  | DeleteJobsSavedSuccess
  | DeleteJobsSavedFailure;
