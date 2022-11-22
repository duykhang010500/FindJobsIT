import { NumberSchema } from 'yup';
import SearchJobs from '../../pages/SearchJobs';
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
  SEARCH_JOB_SUCCESS,
  UPDATE_JOB,
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_SUCCESS,
  EMPLOYER_DELETE_JOB,
  EMPLOYER_DELETE_JOB_FAILURE,
  EMPLOYER_DELETE_JOB_SUCCESS,
  GET_JOBS_APPLIED,
  GET_JOBS_APPLIED_SUCCESS,
  GET_JOBS_APPLIED_FAILURE,
  GET_PENDING_JOBS,
  GET_PENDING_JOBS_SUCCESS,
  GET_PENDING_JOBS_FAILURE,
  APPROVE_JOBS,
  APPROVE_JOBS_SUCCESS,
  APPROVE_JOBS_FAILURE,
  GET_ACTIVE_JOBS,
  GET_ACTIVE_JOBS_SUCCESS,
  GET_ACTIVE_JOBS_FAILURE,
  GET_REJECTED_JOBS,
  GET_REJECTED_JOBS_SUCCESS,
  GET_REJECTED_JOBS_FAILURE,
  EMPLOYER_UPDATE_STATUS_JOB,
} from './actionTypes';

export interface IJobsState {
  isLoading: boolean;
  error: any;
  job: any;
  jobs: any;
  jobsSearch: any;
  pendingJobs: any;
  activeJobs: any;
  rejectedJobs: any;
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
  payload: any;
};

export type SearchJob = {
  type: typeof SearchJobs;
  payload: any;
};

export type SearchJobSuccess = {
  type: typeof SEARCH_JOB_SUCCESS;
  payload: any;
};

export type UpdateJob = {
  type: typeof UPDATE_JOB;
  payload: any;
};

export type UpdateJobSuccess = {
  type: typeof UPDATE_JOB_SUCCESS;
};

export type UpdateJobFailure = {
  type: typeof UPDATE_JOB_FAILURE;
  payload: any;
};

export type EmployerDeleteJob = {
  type: typeof EMPLOYER_DELETE_JOB_SUCCESS;
  payload: any;
};

export type EmployerDeleteJobSuccess = {
  type: typeof EMPLOYER_DELETE_JOB_SUCCESS;
  payload: any;
};

export type EmployerDeleteJobFailure = {
  type: typeof EMPLOYER_DELETE_JOB_FAILURE;
  payload: any;
};

export type GetJobsApplied = {
  type: typeof GET_JOBS_APPLIED;
};
export type GetJobsAppliedSuccess = {
  type: typeof GET_JOBS_APPLIED_SUCCESS;
  payload: any;
};

export type GetJobsAppliedFailure = {
  type: typeof GET_JOBS_APPLIED_FAILURE;
  payload: any;
};

export type GetPendingJobs = {
  type: typeof GET_PENDING_JOBS;
};

export type GetPendingJobsSuccess = {
  type: typeof GET_PENDING_JOBS_SUCCESS;
  payload: any;
};

export type GetPendingJobsFailure = {
  type: typeof GET_PENDING_JOBS_FAILURE;
};

export type ApproveJob = {
  type: typeof APPROVE_JOBS;
  payload: any;
};

export type ApproveJobSuccess = {
  type: typeof APPROVE_JOBS_SUCCESS;
};

export type ApproveJobFailure = {
  type: typeof APPROVE_JOBS_FAILURE;
  payload: any;
};

export type GetActiveJobs = {
  type: typeof GET_ACTIVE_JOBS;
};

export type GetActiveJobsSuccess = {
  type: typeof GET_ACTIVE_JOBS_SUCCESS;
  payload: any;
};

export type GetActiveJobsFailure = {
  type: typeof GET_ACTIVE_JOBS_FAILURE;
  payload: any;
};

export type GetRejectedJobs = {
  type: typeof GET_REJECTED_JOBS;
};

export type GetRejectedJobsSuccess = {
  type: typeof GET_REJECTED_JOBS_SUCCESS;
  payload: any;
};

export type GetRejectedJobsFailure = {
  type: typeof GET_REJECTED_JOBS_FAILURE;
  payload: any;
};

export type EmployerUpdateJobStatus = {
  type: typeof EMPLOYER_UPDATE_STATUS_JOB;
  payload: {
    jobID: number;
    status: number;
  };
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
  | ApplyJobFailure
  | SearchJob
  | SearchJobSuccess
  | UpdateJobSuccess
  | UpdateJobFailure
  | EmployerDeleteJob
  | EmployerDeleteJobSuccess
  | EmployerDeleteJobFailure
  | GetJobsApplied
  | GetJobsAppliedSuccess
  | GetJobsAppliedFailure
  | GetPendingJobs
  | GetPendingJobsSuccess
  | GetPendingJobsFailure
  | ApproveJob
  | ApplyJobSuccess
  | ApproveJobFailure
  | GetActiveJobs
  | GetActiveJobsSuccess
  | GetActiveJobsFailure
  | GetRejectedJobs
  | GetRejectedJobsSuccess
  | GetRejectedJobsFailure
  | EmployerUpdateJobStatus;
