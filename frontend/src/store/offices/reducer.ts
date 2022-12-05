import {
  CLOSE_MODAL,
  CREATE_OFFICE_SUCCESS,
  DELETE_OFFICE_SUCCESS,
  GET_OFFICE,
  GET_OFFICES,
  GET_OFFICES_SUCCESS,
  GET_OFFICE_SUCCESS,
  OPEN_MODAL,
  UPDATE_OFFICE_SUCCESS,
} from './actionTypes';
import { Office, OfficesActions, OfficesState } from './types';

const initialState: OfficesState = {
  isOpen: false,
  isLoading: false,
  office: null,
  offices: [],
};

const officesReducer = (state = initialState, action: OfficesActions) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        office: null,
      };
    case CREATE_OFFICE_SUCCESS:
      return {
        ...state,
        offices: [action.payload, ...state.offices],
      };
    case GET_OFFICES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_OFFICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offices: action.payload,
      };
    case GET_OFFICE:
      return {
        ...state,
      };
    case GET_OFFICE_SUCCESS:
      return {
        ...state,

        office: action.payload,
      };
    case UPDATE_OFFICE_SUCCESS:
      return {
        ...state,
        isOpen: false,
        office: null,
        offices: state.offices.map((office: Office) =>
          office.id === action.payload.id ? action.payload : office
        ),
      };
    case DELETE_OFFICE_SUCCESS:
      return {
        ...state,
        offices: state.offices.filter(
          (office: Office) => office.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default officesReducer;
