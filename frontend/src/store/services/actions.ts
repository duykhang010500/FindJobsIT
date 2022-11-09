import {
  ADD_TO_CART,
  ADMIN_GET_ORDERED_SERVICES,
  ADMIN_GET_ORDERED_SERVICES_FAILURE,
  ADMIN_GET_ORDERED_SERVICES_SUCCESS,
  ADMIN_GET_SERVICES_LIST,
  ADMIN_GET_SERVICES_LIST_SUCCESS,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES_FAILURE,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES_SUCCESS,
  CLEAR_CART,
  CREATE_SERVICE,
  CREATE_SERVICE_FAILURE,
  CREATE_SERVICE_SUCCESS,
  DECREASE_ITEM,
  DELETE_ITEM,
  DELETE_SERVICE,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
  EMPLOYER_GET_ACTIVE_SERVICES,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE_FAILURE,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE_SUCCESS,
  EMPLOYER_GET_ORDERED_SERVICES,
  EMPLOYER_GET_ORDERED_SERVICES_FAILURE,
  EMPLOYER_GET_ORDERED_SERVICES_SUCCESS,
  EMPLOYER_ORDER_SERVICES,
  EMPLOYER_ORDER_SERVICES_FAILURE,
  EMPLOYER_ORDER_SERVICES_SUCCESS,
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  INCREASE_ITEM,
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

//cart

export const addToCart = (service: any) => {
  return {
    type: ADD_TO_CART,
    payload: service,
  };
};

export const increaseItem = (service: any) => {
  return {
    type: INCREASE_ITEM,
    payload: service,
  };
};

export const decreaseItem = (service: any) => {
  return {
    type: DECREASE_ITEM,
    payload: service,
  };
};

export const removeItem = (service: any) => {
  return {
    type: DELETE_ITEM,
    payload: service,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

//emp order services
export const employerOrderServices = (formData: any, navigate: any) => {
  return {
    type: EMPLOYER_ORDER_SERVICES,
    payload: { formData, navigate },
  };
};

export const employerOrderServicesSuccess = (data: any) => {
  return {
    type: EMPLOYER_ORDER_SERVICES_SUCCESS,
    payload: data,
  };
};

export const employerOrderServicesFailure = (err: any) => {
  return {
    type: EMPLOYER_ORDER_SERVICES_FAILURE,
    payload: err,
  };
};

//emp get ordered services
export const employerGetOrderedServices = () => {
  return {
    type: EMPLOYER_GET_ORDERED_SERVICES,
  };
};

export const employerGetOrderedServicesSuccess = (data: any) => {
  return {
    type: EMPLOYER_GET_ORDERED_SERVICES_SUCCESS,
    payload: data,
  };
};

export const employerGetOrderedServicesFailure = (err: any) => {
  return {
    type: EMPLOYER_GET_ORDERED_SERVICES_FAILURE,
    payload: err,
  };
};

//emp get detail ordered service
export const employerGetDetailOrderedService = () => {
  return {
    type: EMPLOYER_GET_DETAIL_ORDERED_SERVICE,
  };
};

export const employerGetDetailOrderedServiceSuccess = (data: any) => {
  return {
    type: EMPLOYER_GET_DETAIL_ORDERED_SERVICE_SUCCESS,
    payload: data,
  };
};

export const employerGetDetailOrderedServiceFailure = (err: any) => {
  return {
    type: EMPLOYER_GET_DETAIL_ORDERED_SERVICE_FAILURE,
    payload: err,
  };
};

//admin management services

export const adminGetOrderedServices = () => {
  return {
    type: ADMIN_GET_ORDERED_SERVICES,
  };
};

export const adminGetOrderedServicesSuccess = (orderedServices: any) => {
  return {
    type: ADMIN_GET_ORDERED_SERVICES_SUCCESS,
    payload: orderedServices,
  };
};

export const adminGetOrderedServicesFailure = (err: any) => {
  return {
    type: ADMIN_GET_ORDERED_SERVICES_FAILURE,
    payload: err,
  };
};

export const adminUpdateOrderedServicesStatus = (
  orderID: number,
  status: number
) => {
  return {
    type: ADMIN_UPDATE_STATUS_ORDERED_SERVICES,
    payload: {
      orderID,
      status,
    },
  };
};

export const adminUpdateOrderedServicesStatusSuccess = (data: any) => {
  return {
    type: ADMIN_UPDATE_STATUS_ORDERED_SERVICES_SUCCESS,
    payload: data,
  };
};

export const adminUpdateOrderedServicesStatusFailure = (err: any) => {
  return {
    type: ADMIN_UPDATE_STATUS_ORDERED_SERVICES_FAILURE,
    payload: err,
  };
};

export const employerActiveServices = (data: any) => {
  return {
    type: EMPLOYER_GET_ACTIVE_SERVICES,
    payload: data,
  };
};
