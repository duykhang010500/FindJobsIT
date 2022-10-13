import {
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
} from './actionTypes';
import { IServicesState, ServicesActions } from './types';

const initialState: IServicesState = {
  isLoading: false,
  list: [],
  service: null,
};

const servicesReducer = (state = initialState, action: ServicesActions) => {
  switch (action.type) {
    case GET_LIST_SERVICES_EMPLOYER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_SERVICES_EMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default servicesReducer;
