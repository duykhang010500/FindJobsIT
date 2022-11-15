import {
  GET_DASHBOARD_ADMIN,
  GET_DASHBOARD_ADMIN_SUCCESS,
  GET_DASHBOARD_ADMIN_FAILURE,
} from './actionTypes';
import { dashboardState, DashboardType } from './types';

const initialState: dashboardState = {
  isLoading: false,
  data: null,
};

const dashboardReducer = (state = initialState, action: DashboardType) => {
  switch (action.type) {
    case GET_DASHBOARD_ADMIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DASHBOARD_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_DASHBOARD_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
