import {
  APPLY_JOB,
  APPLY_JOB_FAILURE,
  APPLY_JOB_SUCCESS,
  APPROVE_JOBS,
  CREATE_JOB,
  CREATE_JOB_FAILURE,
  CREATE_JOB_SUCCESS,
  EMPLOYER_DELETE_JOB,
  EMPLOYER_DELETE_JOB_FAILURE,
  EMPLOYER_DELETE_JOB_SUCCESS,
  EMPLOYER_GET_JOBS,
  EMPLOYER_GET_JOBS_SUCCESS,
  GET_ACTIVE_JOBS,
  GET_ACTIVE_JOBS_FAILURE,
  GET_ACTIVE_JOBS_SUCCESS,
  GET_JOB,
  GET_JOBS,
  GET_JOBS_APPLIED,
  GET_JOBS_APPLIED_SUCCESS,
  GET_JOBS_SUCCESS,
  GET_JOB_FAILURE,
  GET_JOB_SUCCESS,
  GET_PENDING_JOBS,
  GET_PENDING_JOBS_FAILURE,
  GET_PENDING_JOBS_SUCCESS,
  GET_REJECTED_JOBS,
  GET_REJECTED_JOBS_FAILURE,
  GET_REJECTED_JOBS_SUCCESS,
  SEARCH_JOB,
  SEARCH_JOB_FAILURE,
  SEARCH_JOB_SUCCESS,
  UPDATE_JOB,
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_SUCCESS,
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

export const updateJob = (id: any, formData: any, navigate: any) => {
  return {
    type: UPDATE_JOB,
    payload: {
      id,
      formData,
      navigate,
    },
  };
};

//update
export const updateJobSuccess = () => {
  return {
    type: UPDATE_JOB_SUCCESS,
  };
};

export const updateJobFailure = (err: any) => {
  return {
    type: UPDATE_JOB_FAILURE,
    payload: err,
  };
};

//delete
export const employerDeleteJob = (id: any) => {
  return {
    type: EMPLOYER_DELETE_JOB,
    payload: id,
  };
};

export const employerDeleteJobSuccess = (payload: any) => {
  return {
    type: EMPLOYER_DELETE_JOB_SUCCESS,
    payload,
  };
};

export const employerDeleteJobFailure = (err: any) => {
  return {
    type: EMPLOYER_DELETE_JOB_FAILURE,
    payload: err,
  };
};

//apply
export const applyJob = (id: any, formData: any) => ({
  type: APPLY_JOB,
  payload: {
    id,
    formData,
  },
});

export const applyJobSuccess = () => {
  return {
    type: APPLY_JOB_SUCCESS,
  };
};

export const applyJobFailure = (err: any) => ({
  type: APPLY_JOB_FAILURE,
  payload: err,
});

export const getJobsApplied = () => ({
  type: GET_JOBS_APPLIED,
});

export const getJobsAppliedSuccess = (jobs: any) => ({
  type: GET_JOBS_APPLIED_SUCCESS,
  payload: jobs,
});

export const getJobsAppliedFailure = (err: any) => ({
  type: GET_JOB_FAILURE,
  payload: err,
});

export const searchJobs = (keywords: any, locations: any, industries: any) => {
  return {
    type: SEARCH_JOB,
    payload: {
      keywords,
      locations,
      industries,
    },
  };
};

export const searchJobsSuccess = (jobs: any) => {
  return {
    type: SEARCH_JOB_SUCCESS,
    payload: jobs,
  };
};

export const searchJobsFailure = (err: any) => {
  return {
    type: SEARCH_JOB_FAILURE,
    payload: err,
  };
};

export const getPendingJobs = () => {
  return {
    type: GET_PENDING_JOBS,
  };
};

export const getPendingJobsSuccess = (jobs: any) => {
  return {
    type: GET_PENDING_JOBS_SUCCESS,
    payload: jobs,
  };
};

export const getPendingJobsFailure = () => {
  return {
    type: GET_PENDING_JOBS_FAILURE,
  };
};

export const approveJob = (jobId: number, status: number) => {
  return {
    type: APPROVE_JOBS,
    payload: {
      jobId,
      status,
    },
  };
};

export const GetActiveJobs = () => ({
  type: GET_ACTIVE_JOBS,
});

export const GetActiveJobsSuccess = (jobs: any) => ({
  type: GET_ACTIVE_JOBS_SUCCESS,
  payload: jobs,
});

export const GetActiveJobsFailure = (err: any) => ({
  type: GET_ACTIVE_JOBS_FAILURE,
  payload: err,
});

export const GetRejectedJobs = () => ({
  type: GET_REJECTED_JOBS,
});

export const GetRejectedJobsSuccess = (jobs: any) => ({
  type: GET_REJECTED_JOBS_SUCCESS,
  payload: jobs,
});

export const GetRejectedJobsFailure = (err: any) => ({
  type: GET_REJECTED_JOBS_FAILURE,
  payload: err,
});
