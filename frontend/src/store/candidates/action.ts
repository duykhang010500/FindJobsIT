import {
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  DELETE_SAVED_CANDIDATE,
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
  GET_SAVED_CANDIDATES_SUCCESS,
  SAVE_CANDIDATE,
  SEARCH_CANDIDATES,
  SEARCH_CANDIDATES_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
} from './actionTypes';

export const getListCandidatesForEmployer = () => ({
  type: GET_LIST_CANDIDATES_FOR_EMPLOYER,
});

export const getListCandidatesForEmployerSuccess = (list: any) => ({
  type: GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  payload: list,
});

export const adminGetCandidatesList = () => {
  return {
    type: ADMIN_GET_CANDIDATES_LIST,
  };
};

export const adminGetCandidatesListSuccess = (list: any) => {
  return {
    type: ADMIN_GET_CANDIDATES_LIST_SUCCESS,
    payload: list,
  };
};

export const adminGetCandidatesListFailure = () => {
  return {
    type: ADMIN_GET_CANDIDATES_LIST_FAILURE,
  };
};

export const updateStatus = (id: any, formData: any) => {
  return {
    type: UPDATE_STATUS,
    payload: {
      id,
      formData,
    },
  };
};

export const updateStatusSuccess = () => {
  return {
    type: UPDATE_STATUS_SUCCESS,
  };
};

export const updateStatusFailure = (err: any) => {
  return {
    type: UPDATE_STATUS_FAILURE,
    payload: err,
  };
};

export const getDetailCandidate = (id: number) => {
  return {
    type: GET_DETAIL_CANDIDATE,
    payload: id,
  };
};

export const getDetailCandidateSuccess = (candidate: any) => {
  return {
    type: GET_DETAIL_CANDIDATE_SUCCESS,
    payload: candidate,
  };
};

export const getDetailCandidateFailure = (err: any) => {
  return {
    type: GET_DETAIL_CANDIDATE_FAILURE,
    payload: err,
  };
};

export const searchCandidate = (params: any) => {
  return {
    type: SEARCH_CANDIDATES,
    payload: params,
  };
};

export const searchCandidateSuccess = (candidates: any) => {
  return {
    type: SEARCH_CANDIDATES_SUCCESS,
    payload: candidates,
  };
};

export const getDetailResumeCandidate = (id: number) => {
  return {
    type: GET_DETAIL_RESUME_CANDIDATE,
    payload: id,
  };
};

export const getDetailResumeCandidateSuccess = (resume: any) => {
  return {
    type: GET_DETAIL_RESUME_CANDIDATE_SUCCESS,
    payload: resume,
  };
};

export const getDetailResumeCandidateFailure = (err: any) => {
  return {
    type: GET_DETAIL_RESUME_CANDIDATE_FAILURE,
    payload: err,
  };
};

export const saveCandidate = (id: any) => {
  return {
    type: SAVE_CANDIDATE,
    payload: id,
  };
};

export const getSavedCandidates = () => {
  return {
    type: GET_SAVED_CANDIDATES,
  };
};

export const getSavedCandidatesSuccess = (list: any) => {
  return {
    type: GET_SAVED_CANDIDATES_SUCCESS,
    payload: list,
  };
};

export const deleteSavedCandidate = (id: any) => {
  return {
    type: DELETE_SAVED_CANDIDATE,
    payload: id,
  };
};

export const employerSendMail = (formData: any) => {
  return {
    type: EMPLOYER_SEND_MAIL,
    payload: formData,
  };
};

export const employerSendMailSuccess = (data: any) => {
  return {
    type: EMPLOYER_SEND_MAIL_SUCCESS,
    payload: data,
  };
};

export const employerSendMailFailure = (err: any) => {
  return {
    type: EMPLOYER_SEND_MAIL_FAILURE,
    payload: err,
  };
};

export const employerGetSentListMail = () => ({
  type: EMPLOYER_GET_SENT_MAIL_LIST,
});

export const employerGetSentListMailSuccess = (mails: any) => ({
  type: EMPLOYER_GET_SENT_MAIL_LIST_SUCCESS,
  payload: mails,
});

export const employerGetSentListMailFailure = (err: any) => ({
  type: EMPLOYER_GET_SENT_MAIL_LIST_FAILURE,
  payload: err,
});

export const employerGetCandidateByJob = (jobID: any) => ({
  type: EMPLOYER_GET_CANDIDATES_BY_JOB,
  payload: jobID,
});

export const employerGetCandidateByJobSuccess = (candidates: any) => ({
  type: EMPLOYER_GET_CANDIDATES_BY_JOB_SUCCESS,
  payload: candidates,
});

export const employerGetCandidateByJobFailure = (err: any) => ({
  type: EMPLOYER_GET_CANDIDATES_BY_JOB_FAILURE,
  payload: err,
});
