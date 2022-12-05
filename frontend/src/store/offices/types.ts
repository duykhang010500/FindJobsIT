import {
  CLOSE_MODAL,
  CREATE_OFFICE,
  CREATE_OFFICE_SUCCESS,
  DELETE_OFFICE,
  DELETE_OFFICE_SUCCESS,
  GET_OFFICE,
  GET_OFFICES,
  GET_OFFICES_SUCCESS,
  GET_OFFICE_SUCCESS,
  OPEN_MODAL,
  UPDATE_OFFICE,
  UPDATE_OFFICE_SUCCESS,
} from './actionTypes';

export interface Office {
  id: number;
  name: string;
  address: string;
  phone: number;
  priority: number;
  created_at: string;
}

export interface OfficesState {
  isOpen: boolean;
  isLoading: boolean;
  offices: any;
  office: any;
}

export type OpenModal = {
  type: typeof OPEN_MODAL;
};

export type CloseModal = {
  type: typeof CLOSE_MODAL;
};

export type CreateOffice = {
  type: typeof CREATE_OFFICE;
  payload: any;
};

export type CreateOfficeSuccess = {
  type: typeof CREATE_OFFICE_SUCCESS;
  payload: any;
};

export type GetOffices = {
  type: typeof GET_OFFICES;
};

export type GetOfficesSuccess = {
  type: typeof GET_OFFICES_SUCCESS;
  payload: Office[];
};

export type GetOffice = {
  type: typeof GET_OFFICE;
  payload: number;
};

export type GetOfficeSuccess = {
  type: typeof GET_OFFICE_SUCCESS;
  payload: Office;
};

export type UpdateOffice = {
  type: typeof UPDATE_OFFICE;
  payload: any;
};

export type UpdateOfficeSuccess = {
  type: typeof UPDATE_OFFICE_SUCCESS;
  payload: any;
};

export type DeleteOffice = {
  type: typeof DELETE_OFFICE;
  payload: number;
};

export type DeleteOfficeSuccess = {
  type: typeof DELETE_OFFICE_SUCCESS;
  payload: number;
};

export type OfficesActions =
  | OpenModal
  | CloseModal
  | CreateOffice
  | CreateOfficeSuccess
  | GetOffices
  | GetOfficesSuccess
  | GetOffice
  | GetOfficeSuccess
  | UpdateOffice
  | UpdateOfficeSuccess
  | DeleteOffice
  | DeleteOfficeSuccess;
