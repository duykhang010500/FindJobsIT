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
  ADMIN_GET_COMPANIES_ACTIVE,
  ADMIN_GET_COMPANIES_ACTIVE_SUCCESS,
  ADMIN_GET_COMPANIES_REJECTED,
  ADMIN_GET_COMPANIES_REJECTED_SUCCESS,
  ADMIN_UPDATE_COMPANY_STATUS,
  ADMIN_UPDATE_COMPANY_STATUS_SUCCESS,
  FOLLOW_COMPANY,
  GET_FOLLOWING_COMPANIES,
  GET_FOLLOWING_COMPANIES_SUCCESS,
  UN_FOLLOW_COMPANY,
  OPEN_COMPANY_DIALOG,
  CLOSE_COMPANY_DIALOG,
  ADMIN_GET_COMPANIES_PENDING_FAILURE,
  ADMIN_GET_COMPANIES_ACTIVE_FAILURE,
  ADMIN_GET_COMPANIES_REJECTED_FAILURE,
} from './actionTypes';

export interface ICompaniesState {
  isOpenCompanyDialog: boolean;
  isLoading: boolean;
  list: [];
  company: any;
  followingCompany: [];
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

export type AdminGetPendingCompaniesFailure = {
  type: typeof ADMIN_GET_COMPANIES_PENDING_FAILURE;
};

export type AdminGetCompaniesActive = {
  type: typeof ADMIN_GET_COMPANIES_ACTIVE;
};

export type AdminGetCompaniesActiveSuccess = {
  type: typeof ADMIN_GET_COMPANIES_ACTIVE_SUCCESS;
  payload: any;
};

export type AdminGetCompaniesActiveFailure = {
  type: typeof ADMIN_GET_COMPANIES_ACTIVE_FAILURE;
};

export type AdminGetCompaniesRejected = {
  type: typeof ADMIN_GET_COMPANIES_REJECTED;
};

export type AdminGetCompaniesRejectedSuccess = {
  type: typeof ADMIN_GET_COMPANIES_REJECTED_SUCCESS;
  payload: any;
};

export type AdminGetCompaniesRejectedFailure = {
  type: typeof ADMIN_GET_COMPANIES_REJECTED_FAILURE;
};

export type AdminUpdateCompanyStatus = {
  type: typeof ADMIN_UPDATE_COMPANY_STATUS;
  payload: any;
};

export type AdminUpdateCompanyStatusSuccess = {
  type: typeof ADMIN_UPDATE_COMPANY_STATUS_SUCCESS;
  payload: any;
};

export type FollowCompany = {
  type: typeof FOLLOW_COMPANY;
  payload: number;
};

export type GetFollowingCompanies = {
  type: typeof GET_FOLLOWING_COMPANIES;
};

export type GetFollowingCompaniesSuccess = {
  type: typeof GET_FOLLOWING_COMPANIES_SUCCESS;
  payload: any;
};

export type UnFollowCompany = {
  type: typeof UN_FOLLOW_COMPANY;
  payload: number;
};

export type OpenCompanyDialog = {
  type: typeof OPEN_COMPANY_DIALOG;
};

export type CloseCompanyDialog = {
  type: typeof CLOSE_COMPANY_DIALOG;
};

export type CompaniesAction =
  | OpenCompanyDialog
  | CloseCompanyDialog
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
  | AdminGetCompaniesPendingSuccess
  | AdminGetPendingCompaniesFailure
  | AdminGetCompaniesActive
  | AdminGetCompaniesActiveSuccess
  | AdminGetCompaniesActiveFailure
  | AdminGetCompaniesRejected
  | AdminGetCompaniesRejectedSuccess
  | AdminGetCompaniesRejectedFailure
  | AdminUpdateCompanyStatus
  | AdminUpdateCompanyStatusSuccess
  | FollowCompany
  | GetFollowingCompanies
  | GetFollowingCompaniesSuccess
  | UnFollowCompany;
