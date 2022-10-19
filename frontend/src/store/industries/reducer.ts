import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SELECT_INDUSTRY,
  ADMIN_GET_INDUSTRIES_LIST_SUCCESS,
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
    case ADMIN_GET_INDUSTRIES_LIST_SUCCESS:
      return {
        ...state,
        industries: action.payload,
      };
    default:
      return state;
  }
};

export default industriesReducer;
