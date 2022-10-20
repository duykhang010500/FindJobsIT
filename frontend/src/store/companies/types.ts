import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  EMPLOYER_UPDATE_COMPANY,
  EMPLOYER_UPDATE_COMPANY_SUCCESS,
  EMPLOYER_UPDATE_COMPANY_FAILURE,
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

export type EmployerUpdateCompany = {
  type: typeof EMPLOYER_UPDATE_COMPANY;
  payload: any;
};

export type EmployerUpdateCompanySuccess = {
  type: typeof EMPLOYER_UPDATE_COMPANY_SUCCESS;
};

export type EmployerUpdateCompanyFailure = {
  type: typeof EMPLOYER_UPDATE_COMPANY_FAILURE;
  payload: any;
};

export type CompaniesAction =
  | AdminGetCompaniesList
  | AdminGetCompaniesListSuccess
  | EmployerUpdateCompany
  | EmployerUpdateCompanySuccess
  | EmployerUpdateCompanyFailure;
