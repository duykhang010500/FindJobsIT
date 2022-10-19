import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CREATE_LOCATION,
  SELECT_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATION,
  ADMIN_GET_LOCATION,
  ADMIN_GET_LOCATION_FAILURE,
  ADMIN_GET_LOCATION_SUCCESS,
} from './actionTypes';

import {
  ILocation,
  OpenModal,
  CloseModal,
  CreateLocation,
  DeleteLocation,
  SelectLocation,
  UpdateLocation,
  AdminGetLocation,
  AdminGetLocationFailure,
  AdminGetLocationSuccess,
} from './types';

export const openModal = (): OpenModal => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = (): CloseModal => {
  return {
    type: CLOSE_MODAL,
  };
};

export const selectLocation = (id: number): SelectLocation => {
  return {
    type: SELECT_LOCATION,
    payload: id,
  };
};

export const adminGetLocation = (): AdminGetLocation => {
  return {
    type: ADMIN_GET_LOCATION,
  };
};

export const adminGetLocationSuccess = (
  list: ILocation[]
): AdminGetLocationSuccess => {
  return {
    type: ADMIN_GET_LOCATION_SUCCESS,
    payload: list,
  };
};

export const adminGetLocationFailure = (): AdminGetLocationFailure => {
  return {
    type: ADMIN_GET_LOCATION_FAILURE,
  };
};

export const createLocation = (location: ILocation): CreateLocation => {
  return {
    type: CREATE_LOCATION,
    payload: location,
  };
};

export const updateLocation = (
  location: ILocation,
  id: any
): UpdateLocation => {
  return {
    type: UPDATE_LOCATION,
    payload: {
      location,
      id,
    },
  };
};

export const deleteLocation = (id: number): DeleteLocation => {
  return {
    type: DELETE_LOCATION,
    payload: id,
  };
};
