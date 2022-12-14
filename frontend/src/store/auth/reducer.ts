import {
  EMPLOYER_FORGOT_PASSWORD,
  EMPLOYER_FORGOT_PASSWORD_FAILURE,
  EMPLOYER_FORGOT_PASSWORD_SUCCESS,
  GET_CURRENT_JOBSEEKER_SUCCESS,
  GET_INFO_ADMIN_SUCCESS,
  GET_INFO_EMPLOYER_SUCCESS,
  LOGIN_ADMIN,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER_SUCCESS,
  LOGIN_JOBSEEKER,
  LOGIN_JOBSEEKER_FAILURE,
  LOGIN_JOBSEEKER_SUCCESS,
  LOGOUT,
  LOGOUT_EMPLOYER,
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
  REGISTER_JOBSEEKER,
  REGISTER_JOBSEEKER_FAILURE,
  REGISTER_JOBSEEKER_SUCCESS,
  UPDATE_INFO_EMPLOYER,
  UPDATE_INFO_EMPLOYER_FAILURE,
  UPDATE_INFO_EMPLOYER_SUCCESS,
  EMPLOYER_RESET_PASSWORD,
  EMPLOYER_RESET_PASSWORD_FAILURE,
  EMPLOYER_RESET_PASSWORD_SUCCESS,
  JOBSEEKER_RESET_PASSWORD_FAILURE,
  JOBSEEKER_RESET_PASSWORD_SUCCESS,
  JOBSEEKER_RESET_PASSWORD,
  JOBSEEKER_FORGOT_PASSWORD_FAILURE,
  JOBSEEKER_FORGOT_PASSWORD_SUCCESS,
  JOBSEEKER_FORGOT_PASSWORD,
  LOGIN_ADMIN_FAILURE,
} from './actionTypes';
import { AuthActions, IAuthState } from './types';

const initialState: IAuthState = {
  isLoading: false,
  accessToken: localStorage.getItem('accessToken') || null,
  currentUser: null,
  error: null,
};

const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case REGISTER_JOBSEEKER:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_JOBSEEKER_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case REGISTER_JOBSEEKER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case LOGIN_JOBSEEKER:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_JOBSEEKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case LOGIN_JOBSEEKER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_CURRENT_JOBSEEKER_SUCCESS:
      return {
        ...state,
        error: null,
        currentUser: action.payload,
      };

    case REGISTER_EMPLOYER:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REGISTER_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case REGISTER_EMPLOYER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGIN_EMPLOYER:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        accessToken: action.payload,
      };
    case LOGIN_EMPLOYER_FAILURE:
      return {
        ...state,
        isLoading: false,

        error: action.payload,
      };
    case GET_INFO_EMPLOYER_SUCCESS: {
      return {
        ...state,
        error: null,
        currentUser: action.payload,
      };
    }
    case UPDATE_INFO_EMPLOYER:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case UPDATE_INFO_EMPLOYER_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case UPDATE_INFO_EMPLOYER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT_EMPLOYER:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      return {
        ...state,
        error: null,
        currentUser: null,
        accessToken: null,
      };

    case LOGIN_ADMIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_INFO_ADMIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      return {
        ...state,
        currentUser: null,
        accessToken: null,
      };
    case EMPLOYER_FORGOT_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EMPLOYER_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case EMPLOYER_RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EMPLOYER_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case JOBSEEKER_FORGOT_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case JOBSEEKER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case JOBSEEKER_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case JOBSEEKER_RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case JOBSEEKER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case JOBSEEKER_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
