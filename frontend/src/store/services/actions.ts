import {
  ADMIN_GET_LIST_SERVICES_SUCCESS,
  ADMIN_GET_SERVICES_LIST,
  CREATE_SERVICE,
  CREATE_SERVICE_FAILURE,
  CREATE_SERVICE_SUCCESS,
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
} from './actionTypes';

export const getListServicesEmployer = () => ({
  type: GET_LIST_SERVICES_EMPLOYER,
});

export const getListServicesEmployerSuccess = (list: any) => ({
  type: GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  payload: list,
});

export const adminGetServicesList = () => ({
  type: ADMIN_GET_SERVICES_LIST,
});

export const adminGetServicesListSuccess = (list: any) => ({
  type: ADMIN_GET_LIST_SERVICES_SUCCESS,
});

export const getListSevicesEmployerFailure = () => ({
  type: GET_LIST_SERVICES_EMPLOYER_FAILURE,
});

export const createService = () => ({
  type: CREATE_SERVICE,
});

export const createServiceSuccess = (payload: any) => ({
  type: CREATE_SERVICE_SUCCESS,
  payload: payload,
});

export const createServiceFailure = () => ({
  type: CREATE_SERVICE_FAILURE,
});
