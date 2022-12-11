import {
  ADMIN_GET_COMPANIES_ACTIVE_SUCCESS,
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  ADMIN_GET_COMPANIES_PENDING_SUCCESS,
  ADMIN_GET_COMPANIES_REJECTED_SUCCESS,
  ADMIN_UPDATE_COMPANY_STATUS_SUCCESS,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_SUCCESS,
  GET_FOLLOWING_COMPANIES,
  GET_FOLLOWING_COMPANIES_SUCCESS,
} from './actionTypes';
import { ICompaniesState, CompaniesAction } from './types';

const initialState: ICompaniesState = {
  isLoading: false,
  list: [],
  company: null,
  followingCompany: [],
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
    case ADMIN_GET_COMPANIES_ACTIVE_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case ADMIN_UPDATE_COMPANY_STATUS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item: any) => item.id !== action.payload.id),
      };
    case GET_FOLLOWING_COMPANIES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FOLLOWING_COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        followingCompany: action.payload,
      };

    default:
      return state;
  }
};

export default companiesReducer;
