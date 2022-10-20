import {
  ADMIN_GET_LOCATION,
  ADMIN_GET_LOCATION_FAILURE,
  ADMIN_GET_LOCATION_SUCCESS,
  CLOSE_MODAL,
  CREATE_LOCATION,
  CREATE_LOCATION_FAILURE,
  CREATE_LOCATION_SUCCESS,
  OPEN_MODAL,
  SELECT_LOCATION,
  UPDATE_LOCATION,
  UPDATE_LOCATION_FAILURE,
  UPDATE_LOCATION_SUCCESS,
  DELETE_LOCATION,
  DELETE_LOCATION_FAILURE,
  DELETE_LOCATION_SUCCESS,
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
} from './actionTypes';

export interface ILocationState {
  isLoading: boolean;
  list: any[];
  locations: any;
  isOpenModal: boolean;
  selectedLocationId: number | null;
}

export interface ILocation {
  id?: number;
  name: string;
  type?: null;
  created_at?: string;
  updated_at?: string;
}

export type OpenModal = {
  type: typeof OPEN_MODAL;
};

export type CloseModal = {
  type: typeof CLOSE_MODAL;
};

export type SelectLocation = {
  type: typeof SELECT_LOCATION;
  payload: number;
};

export type GetLocation = {
  type: typeof GET_LOCATIONS;
};

export type GetLocationSuccess = {
  type: typeof GET_LOCATIONS_SUCCESS;
  payload: any;
};

export type AdminGetLocation = {
  type: typeof ADMIN_GET_LOCATION;
};

export type AdminGetLocationSuccess = {
  type: typeof ADMIN_GET_LOCATION_SUCCESS;
  payload: ILocation[];
};

export type AdminGetLocationFailure = {
  type: typeof ADMIN_GET_LOCATION_FAILURE;
};

export type CreateLocation = {
  type: typeof CREATE_LOCATION;
  payload: ILocation;
};

export type CreateLocationSuccess = {
  type: typeof CREATE_LOCATION_SUCCESS;
};

export type CreateLocationFailure = {
  type: typeof CREATE_LOCATION_FAILURE;
};

export type UpdateLocation = {
  type: typeof UPDATE_LOCATION;
  payload: {
    location: ILocation;
    id: number;
  };
};

export type UpdateLocationSuccess = {
  type: typeof UPDATE_LOCATION_SUCCESS;
};

export type UpdateLocationFailure = {
  type: typeof UPDATE_LOCATION_FAILURE;
};

export type DeleteLocation = {
  type: typeof DELETE_LOCATION;
  payload: number;
};

export type DeleteLocationSuccess = {
  type: typeof DELETE_LOCATION_SUCCESS;
};

export type DeleteLocationFailure = {
  type: typeof DELETE_LOCATION_FAILURE;
};

export type LocationActions =
  | OpenModal
  | CloseModal
  | SelectLocation
  | GetLocation
  | GetLocationSuccess
  | AdminGetLocationFailure
  | AdminGetLocation
  | AdminGetLocationSuccess
  | AdminGetLocationFailure
  | CreateLocation
  | CreateLocationSuccess
  | CreateLocationFailure
  | UpdateLocation
  | UpdateLocationSuccess
  | UpdateLocationFailure
  | DeleteLocation
  | DeleteLocationSuccess
  | DeleteLocationFailure;
