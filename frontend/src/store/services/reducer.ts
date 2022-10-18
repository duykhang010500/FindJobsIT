import { ServicesState, ServicesActions } from './types';
import {
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
} from './actionTypes';

const initialState: ServicesState = {
  isLoading: false,
  error: null,
  list: [],
  service: null,
  checkout: {
    cart: [],
  },
};

const servicesReducer = (state = initialState, action: ServicesActions) => {
  switch (action.type) {
    case GET_LIST_SERVICES_EMPLOYER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_SERVICES_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case GET_LIST_SERVICES_EMPLOYER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default servicesReducer;
