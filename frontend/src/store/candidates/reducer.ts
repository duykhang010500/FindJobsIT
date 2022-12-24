import {
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS,
  ADMIN_GET_CANDIDATES_LIST,
  ADMIN_GET_CANDIDATES_LIST_SUCCESS,
  ADMIN_GET_CANDIDATES_LIST_FAILURE,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_CANDIDATE_SUCCESS,
  GET_DETAIL_CANDIDATE_FAILURE,
  SEARCH_CANDIDATES,
  SEARCH_CANDIDATES_SUCCESS,
  GET_DETAIL_RESUME_CANDIDATE,
  GET_DETAIL_RESUME_CANDIDATE_SUCCESS,
  GET_DETAIL_RESUME_CANDIDATE_FAILURE,
  EMPLOYER_SEND_MAIL,
  EMPLOYER_SEND_MAIL_SUCCESS,
  EMPLOYER_SEND_MAIL_FAILURE,
  EMPLOYER_GET_SENT_MAIL_LIST,
  EMPLOYER_GET_SENT_MAIL_LIST_SUCCESS,
  EMPLOYER_GET_CANDIDATES_BY_JOB,
  EMPLOYER_GET_CANDIDATES_BY_JOB_SUCCESS,
  EMPLOYER_GET_CANDIDATES_BY_JOB_FAILURE,
  UPDATE_STATUS_SUCCESS,
  OPEN_SAVE,
  CLOSE_SAVE,
  GET_SAVED_CANDIDATES_SUCCESS,
  GET_SAVED_CANDIDATES_BY_FOLDER_SUCCESS,
  ADMIN_UPDATE_STATUS_CANDIDATE_SUCCESS,
  OPEN_MAIL,
  CLOSE_MAIL,
  SELECT_CANDIDATE,
  OPEN_STATUS_DIALOG,
  CLOSE_STATUS_DIALOG,
  DELETE_SAVED_CANDIDATE_SUCCESS,

  // EMPLOYER_GET_SENT_MAIL_LIST_FAILURE,
} from './actionTypes';
import { ICandidatesState, CandidatesActions } from './types';

const initialState: ICandidatesState = {
  isLoading: false,
  candidate: null,
  resume: null,
  isOpenStatusDialog: false,
  list: [],
  savedCandidates: [],
  mails: [],
  selectedCandidate: null,
  isOpenMail: false,
  isSendMail: false,
  candidates: null,
  isLoadingDetail: false,
  job: null,
  isOpenSaveModal: false,
};

const candidatesReducer = (state = initialState, action: CandidatesActions) => {
  switch (action.type) {
    case GET_LIST_CANDIDATES_FOR_EMPLOYER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_CANDIDATES_FOR_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case ADMIN_GET_CANDIDATES_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_CANDIDATES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case ADMIN_GET_CANDIDATES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_DETAIL_CANDIDATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_DETAIL_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidate: action.payload,
        isLoading: false,
      };
    case GET_DETAIL_CANDIDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SEARCH_CANDIDATES:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case GET_DETAIL_RESUME_CANDIDATE:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DETAIL_RESUME_CANDIDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resume: action.payload,
      };
    case GET_DETAIL_RESUME_CANDIDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    //mail
    case SELECT_CANDIDATE:
      return {
        ...state,
        selectedCandidate: action.payload,
        // isOpenMail: true,
      };
    case OPEN_MAIL:
      return {
        ...state,
        isOpenMail: true,
      };
    case CLOSE_MAIL:
      return {
        ...state,
        isOpenMail: false,
      };
    case EMPLOYER_SEND_MAIL:
      return {
        ...state,
        isSendMail: true,
      };
    case EMPLOYER_SEND_MAIL_SUCCESS:
      return {
        ...state,
        isSendMail: false,
        isOpenMail: false,
      };
    case EMPLOYER_SEND_MAIL_FAILURE:
      return {
        ...state,
        isSendMail: false,
        isOpenMail: false,
        error: action.payload,
      };
    case EMPLOYER_GET_SENT_MAIL_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_GET_SENT_MAIL_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mails: action.payload,
      };
    case EMPLOYER_GET_CANDIDATES_BY_JOB:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_GET_CANDIDATES_BY_JOB_SUCCESS:
      return {
        ...state,
        candidates: action.payload,
        isLoading: false,
      };
    case EMPLOYER_GET_CANDIDATES_BY_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    //emp update status candidate
    case OPEN_STATUS_DIALOG:
      return {
        ...state,
        isOpenStatusDialog: true,
      };
    case CLOSE_STATUS_DIALOG:
      return {
        ...state,
        isOpenStatusDialog: false,
      };
    case UPDATE_STATUS_SUCCESS: {
      console.log('REDUCER UPDATE_STATUS_SUCCESS: ', action.payload);
      return {
        ...state,
        isOpenStatusDialog: false,
        list: state?.list?.map((candidate: any) =>
          candidate.id === action.payload.id
            ? { ...candidate, status: action.payload.status }
            : candidate
        ),
        candidates: state?.candidates?.map((candidate: any) =>
          candidate.id === action.payload.id
            ? { ...candidate, status: action.payload.status }
            : candidate
        ),
        // candidate: {
        //   ...state?.candidate,
        //   status: action.payload.status,
        // },
      };
    }
    case OPEN_SAVE:
      return {
        ...state,
        isOpenSaveModal: true,
      };
    case CLOSE_SAVE:
      return {
        ...state,
        isOpenSaveModal: false,
      };
    case GET_SAVED_CANDIDATES_SUCCESS:
      return {
        ...state,
        savedCandidates: action.payload,
      };
    case GET_SAVED_CANDIDATES_BY_FOLDER_SUCCESS:
      return {
        ...state,
        savedCandidates: action.payload,
      };
    case DELETE_SAVED_CANDIDATE_SUCCESS:
      return {
        ...state,
        savedCandidates: state.savedCandidates.filter(
          (candidate: any) => candidate.resume_id !== action.payload
        ),
      };
    case ADMIN_UPDATE_STATUS_CANDIDATE_SUCCESS:
      return {
        ...state,
        list: state.list.map((candidate: any) =>
          candidate.id === action.payload.candidateID
            ? { ...candidate, status: action.payload.status }
            : candidate
        ),
      };
    default:
      return state;
  }
};

export default candidatesReducer;
