import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  CLOSE_SAVE,
  DELETE_SAVED_CANDIDATE,
  DELETE_SAVED_CANDIDATE_FAILURE,
  DELETE_SAVED_CANDIDATE_SUCCESS,
  EMPLOYER_GET_CANDIDATES_BY_JOB,
  EMPLOYER_GET_CANDIDATES_BY_JOB_FAILURE,
  EMPLOYER_GET_CANDIDATES_BY_JOB_SUCCESS,
  EMPLOYER_GET_SENT_MAIL_LIST,
  EMPLOYER_GET_SENT_MAIL_LIST_FAILURE,
  EMPLOYER_GET_SENT_MAIL_LIST_SUCCESS,
  EMPLOYER_SEND_MAIL,
  EMPLOYER_SEND_MAIL_FAILURE,
  EMPLOYER_SEND_MAIL_SUCCESS,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_CANDIDATE_FAILURE,
  GET_DETAIL_CANDIDATE_SUCCESS,
  GET_DETAIL_RESUME_CANDIDATE,
  GET_DETAIL_RESUME_CANDIDATE_FAILURE,
  GET_DETAIL_RESUME_CANDIDATE_SUCCESS,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  GET_SAVED_CANDIDATES,
  GET_SAVED_CANDIDATES_BY_FOLDER,
  GET_SAVED_CANDIDATES_BY_FOLDER_SUCCESS,
  GET_SAVED_CANDIDATES_FAILURE,
  GET_SAVED_CANDIDATES_SUCCESS,
  OPEN_SAVE,
  SAVE_CANDIDATE,
  SAVE_CANDIDATE_FAILURE,
  SAVE_CANDIDATE_SUCCESS,
  SEARCH_CANDIDATES,
  SEARCH_CANDIDATES_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
} from './actionTypes';

export interface ICandidatesState {
  isLoading: boolean;
  list: any[];
  candidate: null | any;
  resume: null | any;
  savedCandidates: null | any;
  isSendMail: boolean;
  mails: any;
  candidates: any;
  isLoadingDetail: boolean;
  job: any;
  isOpenSaveModal: boolean;
}

export type GetListCandidatesForEmployer = {
  type: typeof GET_LIST_CANDIDATES_FOR_EMPLOYER;
};

export type GetListCandidatesForEmployerSuccess = {
  type: typeof GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS;
  payload: any;
};

export type AdminGetCandidatesList = {
  type: typeof ADMIN_GET_CANDIDATES_LIST;
};
export type AdminGetCandidatesListSuccess = {
  type: typeof ADMIN_GET_CANDIDATES_LIST_SUCCESS;
  payload: any;
};

export type AdminGetCandidatesListFailure = {
  type: typeof ADMIN_GET_CANDIDATES_LIST_FAILURE;
};

export type UpdateStatus = {
  type: typeof UPDATE_STATUS;
  payload: any;
};

export type UpdateStatusSuccess = {
  type: typeof UPDATE_STATUS_SUCCESS;
  payload: any;
};

export type UpdateStatusFailure = {
  type: typeof UPDATE_STATUS_FAILURE;
  payload: any;
};

export type GetCandidate = {
  type: typeof GET_DETAIL_CANDIDATE;
  payload: number;
};

export type GetCandidateSuccess = {
  type: typeof GET_DETAIL_CANDIDATE_SUCCESS;
  payload: any;
};

export type GetCandidateFailure = {
  type: typeof GET_DETAIL_CANDIDATE_FAILURE;
  payload: any;
};

export type SearchCandidates = {
  type: typeof SEARCH_CANDIDATES;
  payload: any;
};

export type SearchCandidatesSuccess = {
  type: typeof SEARCH_CANDIDATES_SUCCESS;
  payload: any;
};

export type GetDetailResumeCandidate = {
  type: typeof GET_DETAIL_RESUME_CANDIDATE;
  payload: any;
};

export type GetDetailResumeCandidateSuccess = {
  type: typeof GET_DETAIL_RESUME_CANDIDATE_SUCCESS;
  payload: any;
};

export type GetDetailResumeCandidateFailure = {
  type: typeof GET_DETAIL_RESUME_CANDIDATE_FAILURE;
  payload: any;
};

export type SaveCandidate = {
  type: typeof SAVE_CANDIDATE;
  payload: any;
};

export type SaveCandidateSuccess = {
  type: typeof SAVE_CANDIDATE_SUCCESS;
  payload: any;
};

export type SaveCandidateFailure = {
  type: typeof SAVE_CANDIDATE_FAILURE;
  payload: any;
};

export type GetSavedCandidates = {
  type: typeof GET_SAVED_CANDIDATES;
  payload: any;
};

export type GetSavedCandidatesSuccess = {
  type: typeof GET_SAVED_CANDIDATES_SUCCESS;
  payload: any;
};

export type GetSavedCandidatesFailure = {
  type: typeof GET_SAVED_CANDIDATES_FAILURE;
  payload: any;
};

export type DeleteSavedCandidate = {
  type: typeof DELETE_SAVED_CANDIDATE;
  payload: any;
};

export type DeleteSavedCandidateSuccess = {
  type: typeof DELETE_SAVED_CANDIDATE_SUCCESS;
  payload: any;
};

export type DeleteSavedCandidateFailure = {
  type: typeof DELETE_SAVED_CANDIDATE_FAILURE;
  payload: any;
};

export type EmployerSendMail = {
  type: typeof EMPLOYER_SEND_MAIL;
  payload: any;
};

export type EmployerSendMailSuccess = {
  type: typeof EMPLOYER_SEND_MAIL_SUCCESS;
  payload: any;
};

export type EmployerSendMailFailure = {
  type: typeof EMPLOYER_SEND_MAIL_FAILURE;
  payload: any;
};

export type EmployerGetSentMailList = {
  type: typeof EMPLOYER_GET_SENT_MAIL_LIST;
};

export type EmployerGetSentMailListSuccess = {
  type: typeof EMPLOYER_GET_SENT_MAIL_LIST_SUCCESS;
  payload: any;
};

export type EmployerGetSentMailListFailure = {
  type: typeof EMPLOYER_GET_SENT_MAIL_LIST_FAILURE;
  payload: any;
};

export type EmployerGetCandidatesByJob = {
  type: typeof EMPLOYER_GET_CANDIDATES_BY_JOB;
  payload: number;
};

export type EmployerGetCandidatesByJobSuccess = {
  type: typeof EMPLOYER_GET_CANDIDATES_BY_JOB_SUCCESS;
  payload: any;
};

export type EmployerGetCandidateByJobFailure = {
  type: typeof EMPLOYER_GET_CANDIDATES_BY_JOB_FAILURE;
  payload?: any;
};

export type OpenSave = {
  type: typeof OPEN_SAVE;
};

export type CloseSave = {
  type: typeof CLOSE_SAVE;
};

export type GetSavedCandidatesByFolder = {
  type: typeof GET_SAVED_CANDIDATES_BY_FOLDER;
  payload: number;
};

export type GetSavedCandidatesByFolderSuccess = {
  type: typeof GET_SAVED_CANDIDATES_BY_FOLDER_SUCCESS;
  payload: any;
};

export type CandidatesActions =
  | GetListCandidatesForEmployer
  | GetListCandidatesForEmployerSuccess
  | AdminGetCandidatesList
  | AdminGetCandidatesListSuccess
  | AdminGetCandidatesListFailure
  | UpdateStatus
  | UpdateStatusSuccess
  | UpdateStatusFailure
  | GetCandidate
  | GetCandidateSuccess
  | GetCandidateFailure
  | SearchCandidates
  | SearchCandidatesSuccess
  | GetDetailResumeCandidate
  | GetDetailResumeCandidateSuccess
  | GetDetailResumeCandidateFailure
  | GetSavedCandidates
  | GetSavedCandidatesSuccess
  | GetSavedCandidatesFailure
  | DeleteSavedCandidate
  | DeleteSavedCandidateSuccess
  | DeleteSavedCandidateFailure
  | EmployerSendMail
  | EmployerSendMailSuccess
  | EmployerSendMailFailure
  | EmployerGetSentMailList
  | EmployerGetSentMailListSuccess
  | EmployerGetSentMailListFailure
  | EmployerGetCandidatesByJob
  | EmployerGetCandidatesByJobSuccess
  | EmployerGetCandidateByJobFailure
  | OpenSave
  | CloseSave
  | SaveCandidate
  | SaveCandidateSuccess
  | SaveCandidateFailure
  | GetSavedCandidates
  | GetSavedCandidatesByFolder
  | GetSavedCandidatesByFolderSuccess;
