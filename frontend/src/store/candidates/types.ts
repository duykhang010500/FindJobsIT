import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  ADMIN_UPDATE_STATUS_CANDIDATE,
  ADMIN_UPDATE_STATUS_CANDIDATE_SUCCESS,
  CLOSE_MAIL,
  CLOSE_SAVE,
  CLOSE_STATUS_DIALOG,
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
  OPEN_MAIL,
  OPEN_SAVE,
  OPEN_STATUS_DIALOG,
  SAVE_CANDIDATE,
  SAVE_CANDIDATE_FAILURE,
  SAVE_CANDIDATE_SUCCESS,
  SEARCH_CANDIDATES,
  SEARCH_CANDIDATES_SUCCESS,
  SELECT_CANDIDATE,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
} from './actionTypes';

export interface ICandidatesState {
  isLoading: boolean;
  list: any[];
  isOpenStatusDialog: boolean;
  candidate: null | any;
  resume: null | any;
  mails: any;
  selectedCandidate: any;
  isOpenMail: boolean;
  isSendMail: boolean;
  candidates: any;
  isLoadingDetail: boolean;
  job: any;
  savedCandidates: null | any;
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

//status
export type OpenStatusDialog = {
  type: typeof OPEN_STATUS_DIALOG;
};

export type CloseStatusDialog = {
  type: typeof CLOSE_STATUS_DIALOG;
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

//mail
export type OpenMail = {
  type: typeof OPEN_MAIL;
};

export type CloseMail = {
  type: typeof CLOSE_MAIL;
};

export type SelectCandidate = {
  type: typeof SELECT_CANDIDATE;
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

// candidates

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

export type AdminUpdateStatusCandidate = {
  type: typeof ADMIN_UPDATE_STATUS_CANDIDATE;
  payload: any;
};

export type AdminUpdateStatusCandidateSuccess = {
  type: typeof ADMIN_UPDATE_STATUS_CANDIDATE_SUCCESS;
  payload: any;
};

export type CandidatesActions =
  | GetListCandidatesForEmployer
  | GetListCandidatesForEmployerSuccess
  | AdminGetCandidatesList
  | AdminGetCandidatesListSuccess
  | AdminGetCandidatesListFailure
  | OpenStatusDialog
  | CloseStatusDialog
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
  | OpenMail
  | CloseMail
  | SelectCandidate
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
  | SelectCandidate
  | SaveCandidate
  | SaveCandidateSuccess
  | SaveCandidateFailure
  | GetSavedCandidates
  | GetSavedCandidatesByFolder
  | GetSavedCandidatesByFolderSuccess
  | AdminUpdateStatusCandidate
  | AdminUpdateStatusCandidateSuccess;
