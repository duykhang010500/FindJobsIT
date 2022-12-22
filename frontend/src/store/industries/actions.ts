import { IIndustry } from './types';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CREATE_INDUSTRY,
  SELECT_INDUSTRY,
  UPDATE_INDUSTRY,
  DELETE_INDUSTRY,
  ADMIN_GET_INDUSTRIES_LIST,
  ADMIN_GET_INDUSTRIES_LIST_SUCCESS,
  GET_INDUSTRIES,
  GET_INDUSTRIES_SUCCESS,
} from './actionTypes';

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const selectIndustry = (id: number) => {
  return {
    type: SELECT_INDUSTRY,
    payload: id,
  };
};

export const getIndustries = () => {
  return {
    type: GET_INDUSTRIES,
  };
};

export const getIndustriesSuccess = (industries: IIndustry[]) => {
  return {
    type: GET_INDUSTRIES_SUCCESS,
    payload: industries,
  };
};

export const adminGetIndustriesList = () => {
  return {
    type: ADMIN_GET_INDUSTRIES_LIST,
  };
};

export const adminGetIndustriesListSuccess = (industries: IIndustry[]) => {
  return {
    type: ADMIN_GET_INDUSTRIES_LIST_SUCCESS,
    payload: industries,
  };
};

export const createIndustry = (industry: IIndustry) => {
  return {
    type: CREATE_INDUSTRY,
    payload: industry,
  };
};

export const updateIndustry = (industry: IIndustry, id: any) => {
  return {
    type: UPDATE_INDUSTRY,
    payload: {
      industry,
      id,
    },
  };
};

export const deleteIndustry = (id: any) => {
  return {
    type: DELETE_INDUSTRY,
    payload: id,
  };
};
