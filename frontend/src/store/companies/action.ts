import {
  ADMIN_GET_COMPANIES_LIST,
  ADMIN_GET_COMPANIES_LIST_SUCCESS,
} from './actionTypes';

export const adminGetCompaniesList = () => ({
  type: ADMIN_GET_COMPANIES_LIST,
});

export const adminGetCOmpaniesListSuccess = (list: any) => ({
  type: ADMIN_GET_COMPANIES_LIST_SUCCESS,
  payload: list,
});
