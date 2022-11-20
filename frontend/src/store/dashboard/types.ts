import {
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_ADMIN_FAILURE,
  GET_DASHBOARD_ADMIN_SUCCESS,
  GET_DASHBOARD_EMPLOYER,
  GET_DASHBOARD_EMPLOYER_FAILURE,
  GET_DASHBOARD_EMPLOYER_SUCCESS,
} from './actionTypes';

export type dashboardState = {
  isLoading: boolean;
  data: any;
};

export type GetDashboardAdmin = {
  type: typeof GET_DASHBOARD_ADMIN;
};

export type GetDashboardAdminSuccess = {
  type: typeof GET_DASHBOARD_ADMIN_SUCCESS;
  payload: any;
};

export type GetDashboardAdminFailure = {
  type: typeof GET_DASHBOARD_ADMIN_FAILURE;
};

export type GetDashboardEmployer = {
  type: typeof GET_DASHBOARD_EMPLOYER;
};

export type GetDashboardEmployerSuccess = {
  type: typeof GET_DASHBOARD_EMPLOYER_SUCCESS;
  payload: any;
};

export type GetDashboardEmployerFailure = {
  type: typeof GET_DASHBOARD_EMPLOYER_FAILURE;
  payload: any;
};

export type DashboardType =
  | GetDashboardAdmin
  | GetDashboardAdminSuccess
  | GetDashboardAdminFailure
  | GetDashboardEmployer
  | GetDashboardEmployerSuccess
  | GetDashboardEmployerFailure;
