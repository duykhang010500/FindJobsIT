import {
  ADD_TO_CART,
  ADMIN_GET_ORDERED_SERVICES,
  ADMIN_GET_ORDERED_SERVICES_FAILURE,
  ADMIN_GET_ORDERED_SERVICES_SUCCESS,
  ADMIN_GET_SERVICES_LIST,
  ADMIN_GET_SERVICES_LIST_LIST_FAILURE,
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

export interface ServicesState {
  orderSuccess: any;
  isLoading: boolean;
  error: any;
  list: any;
  service: any;
  cart: any;
  order: any;
  orderList: any;
  activeServices: any;
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

export type AdminGetServicesListFailure = {
  type: typeof ADMIN_GET_SERVICES_LIST_LIST_FAILURE;
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

//cart
export type IncreaseItem = {
  type: typeof INCREASE_ITEM;
  payload: any;
};

export type AddToCard = {
  type: typeof ADD_TO_CART;
  payload: any;
};

export type DecreaseItem = {
  type: typeof DECREASE_ITEM;
  payload: any;
};

export type DeleteItem = {
  type: typeof DELETE_ITEM;
  payload: any;
};

export type EmployerOrderServices = {
  type: typeof EMPLOYER_ORDER_SERVICES;
  payload: any;
};

export type EmployerOrderServicesSuccess = {
  type: typeof EMPLOYER_ORDER_SERVICES_SUCCESS;
  payload: any;
};

export type EmployerOrderServicesFailure = {
  type: typeof EMPLOYER_ORDER_SERVICES_FAILURE;
  payload: any;
};

export type EmployerGetOrderedServices = {
  type: typeof EMPLOYER_GET_ORDERED_SERVICES;
};

export type EmployerGetOrderedServicesSuccess = {
  type: typeof EMPLOYER_GET_ORDERED_SERVICES_SUCCESS;
  payload: any;
};

export type EmployerGetOrderedServicesFailure = {
  type: typeof EMPLOYER_GET_ORDERED_SERVICES_FAILURE;
  payload: any;
};

export type EmployerGetDetailOrderedService = {
  type: typeof EMPLOYER_GET_DETAIL_ORDERED_SERVICE;
  payload: any;
};

export type EmployerGetDetailOrderedServiceSuccess = {
  type: typeof EMPLOYER_GET_DETAIL_ORDERED_SERVICE_SUCCESS;
  payload: any;
};

export type EmployerGetDetailOrderedServiceFailure = {
  type: typeof EMPLOYER_GET_DETAIL_ORDERED_SERVICE_FAILURE;
  payload: any;
};

//admin management services
export type AdminGetOrderedServices = {
  type: typeof ADMIN_GET_ORDERED_SERVICES;
};

export type AdminGetOrderedServicesSuccess = {
  type: typeof ADMIN_GET_ORDERED_SERVICES_SUCCESS;
  payload: any;
};

export type AdminGetOrderedServicesFailure = {
  type: typeof ADMIN_GET_ORDERED_SERVICES_FAILURE;
};

export type AdminUpdateOrderedServices = {
  type: typeof ADMIN_UPDATE_STATUS_ORDERED_SERVICES;
  payload: any;
};

export type AdminUpdateOrderedServicesSuccess = {
  type: typeof ADMIN_UPDATE_STATUS_ORDERED_SERVICES_SUCCESS;
  payload?: any;
};

export type AdminUpdateOrderedServicesFailure = {
  type: typeof ADMIN_UPDATE_STATUS_ORDERED_SERVICES_FAILURE;
  payload?: any;
};

//
export type EmployerGetActiveServices = {
  type: typeof EMPLOYER_GET_ACTIVE_SERVICES;
  payload: any;
};

export type ClearCart = {
  type: typeof CLEAR_CART;
};

export type ServicesActions =
  | GetListServicesEmployer
  | GetListServicesEmployerSuccess
  | GetListServicesEmployerFailure
  | AdminGetServicesList
  | AdminGetServicesListSuccess
  | AdminGetServicesListFailure
  | CreateService
  | CreateServiceSuccess
  | CreateServiceFailure
  | UpdateService
  | UpdateServiceSuccess
  | UpdateServicesFailure
  | DeleteService
  | DeleteServiceSuccess
  | DeleteServiceFailure
  | IncreaseItem
  | AddToCard
  | DecreaseItem
  | DeleteItem
  | ClearCart
  | EmployerOrderServices
  | EmployerOrderServicesSuccess
  | EmployerOrderServicesFailure
  | EmployerGetOrderedServices
  | EmployerGetOrderedServicesSuccess
  | EmployerGetOrderedServicesFailure
  | EmployerGetDetailOrderedService
  | EmployerGetDetailOrderedServiceSuccess
  | EmployerGetDetailOrderedServiceFailure
  | AdminGetOrderedServices
  | AdminGetOrderedServicesSuccess
  | AdminGetOrderedServicesFailure
  | AdminUpdateOrderedServices
  | AdminUpdateOrderedServicesSuccess
  | AdminUpdateOrderedServicesFailure
  | EmployerGetActiveServices;
