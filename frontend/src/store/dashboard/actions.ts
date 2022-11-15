import {
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_ADMIN_FAILURE,
  GET_DASHBOARD_ADMIN_SUCCESS,
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
