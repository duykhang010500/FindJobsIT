import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
} from './actionTypes';
import { ICompaniesState, CompaniesAction } from './types';

const initialState: ICompaniesState = {
  isLoading: false,
  list: [],
};

const companiesReducer = (state = initialState, action: CompaniesAction) => {
  switch (action.type) {
    case ADMIN_GET_COMPANIES_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_COMPANIES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default companiesReducer;
