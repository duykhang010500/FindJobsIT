import {
  GET_CURRENT_JOBSEEKER_SUCCESS,
  GET_INFO_EMPLOYER_SUCCESS,
  LOGIN_ADMIN,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER_SUCCESS,
  LOGIN_JOBSEEKER,
  LOGIN_JOBSEEKER_FAILURE,
  LOGIN_JOBSEEKER_SUCCESS,
  LOGOUT_EMPLOYER,
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
  REGISTER_JOBSEEKER,
  REGISTER_JOBSEEKER_FAILURE,
  REGISTER_JOBSEEKER_SUCCESS,
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
        currentUser: action.payload,
      };
    case REGISTER_EMPLOYER:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
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
      };
    case LOGIN_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload,
      };
    case GET_INFO_EMPLOYER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case LOGIN_EMPLOYER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT_EMPLOYER:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      return {
        ...state,
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
    default:
      return state;
  }
};

export default authReducer;
