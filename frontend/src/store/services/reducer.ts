import { ServicesState, ServicesActions } from './types';
import {
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
  ADMIN_GET_SERVICES_LIST,
  ADMIN_GET_SERVICES_LIST_SUCCESS,
  CREATE_SERVICE,
  CREATE_SERVICE_SUCCESS,
  UPDATE_SERVICE,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  CREATE_SERVICE_FAILURE,
  DELETE_SERVICE,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE,
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
    case ADMIN_GET_SERVICES_LIST:
      return {
        ...state,
      };
    case ADMIN_GET_SERVICES_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        list: action.payload,
      };
    case CREATE_SERVICE:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case CREATE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case UPDATE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_SERVICE:
      return {
        ...state,
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item: any) => item.id !== action.payload),
      };
    case DELETE_SERVICE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default servicesReducer;
