import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
} from './actionTypes';

export interface ICompaniesState {
  isLoading: boolean;
  list: [];
}

export type AdminGetCompaniesList = {
  type: typeof ADMIN_GET_COMPANIES_LIST;
};

export type AdminGetCompaniesListSuccess = {
  type: typeof ADMIN_GET_COMPANIES_LIST_SUCCESS;
  payload: any;
};

export type CompaniesAction =
  | AdminGetCompaniesList
  | AdminGetCompaniesListSuccess;
