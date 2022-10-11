import { CREATE_JOB } from './actionTypes';

export const createJob = (formData: any) => ({
  type: CREATE_JOB,
  payload: { formData },
});
