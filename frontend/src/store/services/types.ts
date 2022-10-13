import {
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
} from './actionTypes';

export interface IServicesState {
  isLoading: boolean;
  list: any;
  service: any;
}

export type GetListServicesEmployer = {
  type: typeof GET_LIST_SERVICES_EMPLOYER;
};

export type GetListServicesEmployerSuccess = {
  type: typeof GET_LIST_SERVICES_EMPLOYER_SUCCESS;
  payload: any;
};

export type ServicesActions =
  | GetListServicesEmployer
  | GetListServicesEmployerSuccess;
