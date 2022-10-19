import {
  ADMIN_GET_SERVICES_LIST,
  ADMIN_GET_SERVICES_LIST_SUCCESS,
  CREATE_SERVICE,
  CREATE_SERVICE_FAILURE,
  CREATE_SERVICE_SUCCESS,
  DELETE_SERVICE,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  UPDATE_SERVICE,
  UPDATE_SERVICE_FAILURE,
  UPDATE_SERVICE_SUCCESS,
} from './actionTypes';
import { DeleteService, DeleteServiceSuccess } from './types';

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
  type: ADMIN_GET_SERVICES_LIST_SUCCESS,
  payload: list,
});

export const getListSevicesEmployerFailure = () => ({
  type: GET_LIST_SERVICES_EMPLOYER_FAILURE,
});

export const createService = (formData: any) => ({
  type: CREATE_SERVICE,
  payload: formData,
});

export const createServiceSuccess = () => ({
  type: CREATE_SERVICE_SUCCESS,
});

export const createServiceFailure = (error: any) => ({
  type: CREATE_SERVICE_FAILURE,
  payload: error,
});

export const updateService = (formData: any, id: any, navigate: any) => {
  return {
    type: UPDATE_SERVICE,
    payload: {
      formData,
      id,
      navigate,
    },
  };
};

export const updateServiceSuccess = () => {
  return {
    type: UPDATE_SERVICE_SUCCESS,
  };
};

export const updateServiceFailure = (err: any) => {
  return {
    type: UPDATE_SERVICE_FAILURE,
    payload: err,
  };
};

export const deleteService = (id: string): DeleteService => {
  return {
    type: DELETE_SERVICE,
    payload: id,
  };
};

export const deleteServiceSuccess = (id: string): DeleteServiceSuccess => {
  return {
    type: DELETE_SERVICE_SUCCESS,
    payload: id,
  };
};

export const deleteServiceFailure = () => {
  return {
    type: DELETE_SERVICE_FAILURE,
  };
};
