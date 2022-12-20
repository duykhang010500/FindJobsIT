import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SELECT_INDUSTRY,
  ADMIN_GET_INDUSTRIES_LIST_SUCCESS,
  GET_INDUSTRIES_SUCCESS,
  ADMIN_GET_INDUSTRIES_LIST,
} from './actionTypes';

import { IIndustriesState, IndustriesActionTypes } from './types';

const initialState: IIndustriesState = {
  isLoading: false,
  isOpenModal: false,
  industries: [],
  selectedIndustryId: null,
};

const industriesReducer = (
  state = initialState,
  action: IndustriesActionTypes
) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpenModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        selectedIndustryId: null,
      };
    case SELECT_INDUSTRY:
      return {
        ...state,
        isOpenModal: true,
        selectedIndustryId: action.payload,
      };
    case GET_INDUSTRIES_SUCCESS:
      return {
        ...state,
        industries: action.payload,
      };
    case ADMIN_GET_INDUSTRIES_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_INDUSTRIES_LIST_SUCCESS:
      return {
        ...state,
        industries: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default industriesReducer;
