import {
  DELETE_JOBS_SAVED,
  GET_JOBS_SAVED,
  GET_JOBS_SAVED_SUCCESS,
  SAVE_JOB,
} from './actionTypes';

export const saveJob = (id: any) => {
  return {
    type: SAVE_JOB,
    payload: id,
  };
};

export const getJobsSaved = () => {
  return {
    type: GET_JOBS_SAVED,
  };
};

export const getJobsSavedSuccess = (list: any) => {
  return {
    type: GET_JOBS_SAVED_SUCCESS,
    payload: list,
  };
};

export const deleteJobSaved = (id: any) => {
  return {
    type: DELETE_JOBS_SAVED,
    payload: id,
  };
};
