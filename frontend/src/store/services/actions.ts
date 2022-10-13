import {
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
} from './actionTypes';

export const getListServicesEmployer = () => ({
  type: GET_LIST_SERVICES_EMPLOYER,
});

export const getListServicesEmployerSuccess = (list: any) => ({
  type: GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  payload: list,
});
