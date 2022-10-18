import {
  CREATE_SERVICE,
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
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

export type CreateService = {
  type: typeof CREATE_SERVICE;
};

export type ServicesActions =
  | GetListServicesEmployer
  | GetListServicesEmployerSuccess
  | GetListServicesEmployerFailure
  | CreateService;
