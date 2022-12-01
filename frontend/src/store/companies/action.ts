import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  ADMIN_GET_COMPANIES_PENDING,
  ADMIN_GET_COMPANIES_PENDING_SUCCESS,
  EMPLOYER_UPDATE_COMPANY,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
} from './actionTypes';

export const adminGetCompaniesList = () => ({
  type: ADMIN_GET_COMPANIES_LIST,
});

export const adminGetCOmpaniesListSuccess = (list: any) => ({
  type: ADMIN_GET_COMPANIES_LIST_SUCCESS,
  payload: list,
});

export const employerUpdateCompany = (formData: any) => ({
  type: EMPLOYER_UPDATE_COMPANY,
  payload: formData,
});

export const getCompanies = () => ({
  type: GET_COMPANIES,
});

export const getCompaniesSuccess = (companies: any) => ({
  type: GET_COMPANIES_SUCCESS,
  payload: companies,
});

export const getCompany = (id: number) => ({
  type: GET_COMPANY,
  payload: id,
});

export const getCompanySuccess = (company: any) => ({
  type: GET_COMPANY_SUCCESS,
  payload: company,
});

export const adminGetCompaniesPending = () => ({
  type: ADMIN_GET_COMPANIES_PENDING,
});

export const adminGetCompaniesPendingSuccess = (companies: any) => ({
  type: ADMIN_GET_COMPANIES_PENDING_SUCCESS,
  payload: companies,
});
