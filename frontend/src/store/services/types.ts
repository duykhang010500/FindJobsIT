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

export interface ServicesState {
  isLoading: boolean;
  error: any;
  list: any;
  service: any;
  checkout: any;
}

export type GetListServicesEmployer = {
  type: typeof GET_LIST_SERVICES_EMPLOYER;
};

export type GetListServicesEmployerSuccess = {
  type: typeof GET_LIST_SERVICES_EMPLOYER_SUCCESS;
  payload: any;
};

export type GetListServicesEmployerFailure = {
  type: typeof GET_LIST_SERVICES_EMPLOYER_FAILURE;
  payload: any;
};

export type AdminGetServicesList = {
  type: typeof ADMIN_GET_SERVICES_LIST;
};

export type AdminGetServicesListSuccess = {
  type: typeof ADMIN_GET_SERVICES_LIST_SUCCESS;
  payload: any;
};

export type CreateService = {
  type: typeof CREATE_SERVICE;
};

export type CreateServiceSuccess = {
  type: typeof CREATE_SERVICE_SUCCESS;
};

export type CreateServiceFailure = {
  type: typeof CREATE_SERVICE_FAILURE;
  payload: any;
};

export type UpdateService = {
  type: typeof UPDATE_SERVICE;
};

export type UpdateServiceSuccess = {
  type: typeof UPDATE_SERVICE_SUCCESS;
  payload?: any;
};

export type UpdateServicesFailure = {
  type: typeof UPDATE_SERVICE_FAILURE;
  payload?: any;
};

export type DeleteService = {
  type: typeof DELETE_SERVICE;
  payload?: any;
};

export type DeleteServiceSuccess = {
  type: typeof DELETE_SERVICE_SUCCESS;
  payload?: any;
};

export type DeleteServiceFailure = {
  type: typeof DELETE_SERVICE_FAILURE;
  payload?: any;
};

export type ServicesActions =
  | GetListServicesEmployer
  | GetListServicesEmployerSuccess
  | GetListServicesEmployerFailure
  | AdminGetServicesList
  | AdminGetServicesListSuccess
  | CreateService
  | CreateServiceSuccess
  | CreateServiceFailure
  | UpdateService
  | UpdateServiceSuccess
  | UpdateServicesFailure
  | DeleteService
  | DeleteServiceSuccess
  | DeleteServiceFailure;
