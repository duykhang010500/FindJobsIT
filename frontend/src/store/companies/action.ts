import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
  EMPLOYER_UPDATE_COMPANY,
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
