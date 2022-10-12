import {
  LOGIN_ADMIN,
  LOGIN_EMPLOYER,
  LOGIN_EMPLOYER_FAILURE,
  LOGIN_EMPLOYER_SUCCESS,
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
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
    case LOGIN_EMPLOYER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGIN_ADMIN:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
