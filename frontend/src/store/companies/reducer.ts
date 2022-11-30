import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  ADMIN_GET_COMPANIES_PENDING_SUCCESS,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_SUCCESS,
} from './actionTypes';
import { ICompaniesState, CompaniesAction } from './types';

const initialState: ICompaniesState = {
  isLoading: false,
  list: [],
  company: null,
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
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload,
      };
    case ADMIN_GET_COMPANIES_PENDING_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default companiesReducer;
