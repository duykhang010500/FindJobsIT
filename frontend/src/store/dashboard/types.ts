import {
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_ADMIN_FAILURE,
  GET_DASHBOARD_ADMIN_SUCCESS,
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

export type DashboardType =
  | GetDashboardAdmin
  | GetDashboardAdminSuccess
  | GetDashboardAdminFailure;
