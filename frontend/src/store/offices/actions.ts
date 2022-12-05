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
import { Office } from './types';

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const createOffice = (formData: Office) => {
  return {
    type: CREATE_OFFICE,
    payload: formData,
  };
};

export const createOfficesSuccess = (office: Office) => ({
  type: CREATE_OFFICE_SUCCESS,
  payload: office,
});

export const getOffices = () => ({
  type: GET_OFFICES,
});

export const getOfficesSuccess = (offices: Office[]) => ({
  type: GET_OFFICES_SUCCESS,
  payload: offices,
});

export const getOffice = (id: number) => ({
  type: GET_OFFICE,
  payload: id,
});

export const getOfficeSuccess = (office: Office) => ({
  type: GET_OFFICE_SUCCESS,
  payload: office,
});

export const updateOffice = (id: number, office: Office) => ({
  type: UPDATE_OFFICE,
  payload: { id, office },
});

export const updateOfficeSuccess = (office: Office) => ({
  type: UPDATE_OFFICE_SUCCESS,
  payload: office,
});

export const deleteOffice = (officeID: number) => ({
  type: DELETE_OFFICE,
  payload: officeID,
});

export const deleteOfficeSuccess = (officeID: number) => ({
  type: DELETE_OFFICE_SUCCESS,
  payload: officeID,
});
