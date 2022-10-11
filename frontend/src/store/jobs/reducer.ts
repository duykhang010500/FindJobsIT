import { CREATE_JOB } from './actionTypes';
import { IJobsState, JobsAction } from './types';

const initialState: IJobsState = {
  isLoading: false,
};

const JobsReducer = (state = initialState, action: JobsAction) => {
  switch (action.type) {
    case CREATE_JOB:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default JobsReducer;
