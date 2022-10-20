import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SELECT_LOCATION,
  ADMIN_GET_LOCATION_SUCCESS,
  GET_LOCATIONS_SUCCESS,
} from './actionTypes';
import { LocationActions, ILocationState } from './types';

const initialState: ILocationState = {
  list: [],
  locations: [],
  isLoading: false,
  isOpenModal: false,
  selectedLocationId: null,
};

const locationReducer = (state = initialState, action: LocationActions) => {
  switch (action.type) {
    case ADMIN_GET_LOCATION_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case OPEN_MODAL:
      return {
        ...state,
        isOpenModal: true,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        selectedLocationId: null,
      };
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
      };
    case SELECT_LOCATION:
      return {
        ...state,
        isOpenModal: true,
        selectedLocationId: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
