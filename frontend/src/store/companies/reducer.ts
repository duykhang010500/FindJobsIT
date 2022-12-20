import {
  ADMIN_GET_COMPANIES_ACTIVE,
  ADMIN_GET_COMPANIES_ACTIVE_FAILURE,
  ADMIN_GET_COMPANIES_ACTIVE_SUCCESS,
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  ADMIN_GET_COMPANIES_PENDING,
  ADMIN_GET_COMPANIES_PENDING_FAILURE,
  ADMIN_GET_COMPANIES_PENDING_SUCCESS,
  ADMIN_GET_COMPANIES_REJECTED,
  ADMIN_GET_COMPANIES_REJECTED_FAILURE,
  ADMIN_GET_COMPANIES_REJECTED_SUCCESS,
  ADMIN_UPDATE_COMPANY_STATUS_SUCCESS,
  CLOSE_COMPANY_DIALOG,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_SUCCESS,
  GET_FOLLOWING_COMPANIES,
  GET_FOLLOWING_COMPANIES_SUCCESS,
  OPEN_COMPANY_DIALOG,
} from './actionTypes';
import { ICompaniesState, CompaniesAction } from './types';

const initialState: ICompaniesState = {
  isOpenCompanyDialog: false,
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

    //pending companies
    case ADMIN_GET_COMPANIES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_COMPANIES_PENDING_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case ADMIN_GET_COMPANIES_PENDING_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    //active companies
    case ADMIN_GET_COMPANIES_ACTIVE:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_COMPANIES_ACTIVE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case ADMIN_GET_COMPANIES_ACTIVE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // rejected company
    case ADMIN_GET_COMPANIES_REJECTED:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_COMPANIES_REJECTED_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case ADMIN_GET_COMPANIES_REJECTED_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    //up date status company
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
    case OPEN_COMPANY_DIALOG:
      return {
        ...state,
        isOpenCompanyDialog: true,
      };

    case CLOSE_COMPANY_DIALOG:
      return {
        ...state,
        isOpenCompanyDialog: false,
      };

    default:
      return state;
  }
};

export default companiesReducer;
