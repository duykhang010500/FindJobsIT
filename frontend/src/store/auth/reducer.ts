import {
  REGISTER_EMPLOYER,
  REGISTER_EMPLOYER_FAILURE,
  REGISTER_EMPLOYER_SUCCESS,
} from './actionTypes';
import { AuthActions, IAuthState } from './types';

const initialState: IAuthState = {
  isLoading: false,
  currentUser: 'K',
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
    default:
      return state;
  }
};

export default authReducer;
