import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  EMPLOYER_UPDATE_COMPANY,
  EMPLOYER_UPDATE_COMPANY_SUCCESS,
  EMPLOYER_UPDATE_COMPANY_FAILURE,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  ADMIN_GET_COMPANIES_PENDING,
  ADMIN_GET_COMPANIES_PENDING_SUCCESS,
} from './actionTypes';

export interface ICompaniesState {
  isLoading: boolean;
  list: [];
  company: any;
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

export type GetCompanies = {
  type: typeof GET_COMPANIES;
};

export type GetCompaniesSuccess = {
  type: typeof GET_COMPANIES_SUCCESS;
  payload: any;
};

export type GetCompany = {
  type: typeof GET_COMPANY;
  payload: number;
};

export type GetCompanySuccess = {
  type: typeof GET_COMPANY_SUCCESS;
  payload: any;
};

export type GetCompanyFailure = {
  type: typeof GET_COMPANY_FAILURE;
  payload: any;
};

export type AdminGetCompaniesPending = {
  type: typeof ADMIN_GET_COMPANIES_PENDING;
};

export type AdminGetCompaniesPendingSuccess = {
  type: typeof ADMIN_GET_COMPANIES_PENDING_SUCCESS;
  payload: any;
};

export type CompaniesAction =
  | AdminGetCompaniesList
  | AdminGetCompaniesListSuccess
  | EmployerUpdateCompany
  | EmployerUpdateCompanySuccess
  | EmployerUpdateCompanyFailure
  | GetCompanies
  | GetCompaniesSuccess
  | GetCompany
  | GetCompanySuccess
  | GetCompanyFailure
  | AdminGetCompaniesPending
  | AdminGetCompaniesPendingSuccess;
