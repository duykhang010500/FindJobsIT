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
  ADMIN_UPDATE_COMPANY_STATUS,
  ADMIN_UPDATE_COMPANY_STATUS_SUCCESS,
  CLOSE_COMPANY_DIALOG,
  EMPLOYER_UPDATE_COMPANY,
  FOLLOW_COMPANY,
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY,
  GET_COMPANY_FAILURE,
  GET_COMPANY_SUCCESS,
  GET_FOLLOWING_COMPANIES,
  GET_FOLLOWING_COMPANIES_SUCCESS,
  OPEN_COMPANY_DIALOG,
  UN_FOLLOW_COMPANY,
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

export const getCompanyFailure = () => ({
  type: GET_COMPANY_FAILURE,
});

//pending companies
export const adminGetCompaniesPending = () => ({
  type: ADMIN_GET_COMPANIES_PENDING,
});

export const adminGetCompaniesPendingSuccess = (companies: any) => ({
  type: ADMIN_GET_COMPANIES_PENDING_SUCCESS,
  payload: companies,
});

export const adminGetPendingCompaniesFailure = () => ({
  type: ADMIN_GET_COMPANIES_PENDING_FAILURE,
});

export const adminGetCompaniesActive = () => ({
  type: ADMIN_GET_COMPANIES_ACTIVE,
});

export const adminGetCompaniesActiveSuccess = (companies: any) => ({
  type: ADMIN_GET_COMPANIES_ACTIVE_SUCCESS,
  payload: companies,
});

export const adminGetCompaniesActiveFailure = () => ({
  type: ADMIN_GET_COMPANIES_ACTIVE_FAILURE,
});

export const adminGetCompaniesRejected = () => ({
  type: ADMIN_GET_COMPANIES_REJECTED,
});

export const adminGetCompaniesRejectedSuccess = (companies: any) => ({
  type: ADMIN_GET_COMPANIES_REJECTED_SUCCESS,
  payload: companies,
});

export const adminGetRejectedCompaniesFailure = () => ({
  type: ADMIN_GET_COMPANIES_REJECTED_FAILURE,
});

export const adminUpdateCompanyStatus = (id: number, status: number) => ({
  type: ADMIN_UPDATE_COMPANY_STATUS,
  payload: {
    id,
    status,
  },
});

export const adminUpdateCompanyStatusSuccess = (
  id: number,
  status: number
) => ({
  type: ADMIN_UPDATE_COMPANY_STATUS_SUCCESS,
  payload: {
    id,
    status,
  },
});

export const followCompany = (id: number) => {
  return {
    type: FOLLOW_COMPANY,
    payload: id,
  };
};

export const getFollowingCompanies = () => ({
  type: GET_FOLLOWING_COMPANIES,
});

export const getFollowingCompaniesSusses = (companies: any) => ({
  type: GET_FOLLOWING_COMPANIES_SUCCESS,
  payload: companies,
});

export const unFollowCompany = (id: number) => ({
  type: UN_FOLLOW_COMPANY,
  payload: id,
});

export const openCompanyDialog = () => ({
  type: OPEN_COMPANY_DIALOG,
});

export const closeCompanyDialog = () => ({
  type: CLOSE_COMPANY_DIALOG,
});
