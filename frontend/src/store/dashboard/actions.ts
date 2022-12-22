import {
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_ADMIN_FAILURE,
  GET_DASHBOARD_ADMIN_SUCCESS,
  GET_DASHBOARD_EMPLOYER,
  GET_DASHBOARD_EMPLOYER_FAILURE,
  GET_DASHBOARD_EMPLOYER_SUCCESS,
} from './actionTypes';

export const getDashboardAmin = () => ({
  type: GET_DASHBOARD_ADMIN,
});

export const getDashboardAdminSuccess = (data: any) => ({
  type: GET_DASHBOARD_ADMIN_SUCCESS,
  payload: data,
});

export const getDashboardAdminFailure = () => ({
  type: GET_DASHBOARD_ADMIN_FAILURE,
});

export const getDashboardEmployer = () => ({
  type: GET_DASHBOARD_EMPLOYER,
});

export const getDashboardEmployerSuccess = (dashboard: any) => ({
  type: GET_DASHBOARD_EMPLOYER_SUCCESS,
  payload: dashboard,
});

export const getDashboardEmployerFailure = (err: any) => ({
  type: GET_DASHBOARD_EMPLOYER_FAILURE,
  payload: err,
});
