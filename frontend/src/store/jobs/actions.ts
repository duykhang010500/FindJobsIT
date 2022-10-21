import {
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
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
