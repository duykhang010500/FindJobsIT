import uniqBy from 'lodash/uniqBy';
import dayjs from 'dayjs';

import { ServicesState, ServicesActions } from './types';
import {
  GET_LIST_SERVICES_EMPLOYER,
  GET_LIST_SERVICES_EMPLOYER_SUCCESS,
  GET_LIST_SERVICES_EMPLOYER_FAILURE,
  ADMIN_GET_SERVICES_LIST,
  ADMIN_GET_SERVICES_LIST_SUCCESS,
  CREATE_SERVICE,
  CREATE_SERVICE_SUCCESS,
  UPDATE_SERVICE,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  CREATE_SERVICE_FAILURE,
  DELETE_SERVICE,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE,
  INCREASE_ITEM,
  ADD_TO_CART,
  DECREASE_ITEM,
  DELETE_ITEM,
  EMPLOYER_ORDER_SERVICES,
  EMPLOYER_ORDER_SERVICES_SUCCESS,
  EMPLOYER_ORDER_SERVICES_FAILURE,
  EMPLOYER_GET_ORDERED_SERVICES,
  EMPLOYER_GET_ORDERED_SERVICES_SUCCESS,
  EMPLOYER_GET_ORDERED_SERVICES_FAILURE,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE_SUCCESS,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE_FAILURE,
  ADMIN_GET_ORDERED_SERVICES,
  ADMIN_GET_ORDERED_SERVICES_SUCCESS,
  ADMIN_GET_ORDERED_SERVICES_FAILURE,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES_SUCCESS,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES_FAILURE,
  EMPLOYER_GET_ACTIVE_SERVICES,
  CLEAR_CART,
} from './actionTypes';
import { array } from 'yup';

const initialState: ServicesState = {
  isLoading: false,
  error: null,
  list: [],
  service: null,
  cart: [],
  order: null,
  orderSuccess: null,
  orderList: [],
  activeServices: [],
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
    case GET_LIST_SERVICES_EMPLOYER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ADMIN_GET_SERVICES_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_SERVICES_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        list: action.payload,
        isLoading: false,
      };
    case CREATE_SERVICE:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case CREATE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case UPDATE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_SERVICE:
      return {
        ...state,
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item: any) => item.id !== action.payload),
      };
    case DELETE_SERVICE_FAILURE:
      return {
        ...state,
      };
    //cart
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }
    case INCREASE_ITEM: {
      const id = action.payload.id;

      if (state.cart.findIndex((item: any) => item.id === id) < 0) {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
      const updateCart = state.cart.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updateCart,
      };
    }
    case DECREASE_ITEM: {
      const id = action.payload.id;
      const updateCart = state.cart.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updateCart,
      };
    }
    case DELETE_ITEM: {
      const id = action.payload.id;
      const updateCart = state.cart.filter((item: any) => item.id !== id);
      return {
        ...state,
        cart: updateCart,
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    //emp order services
    case EMPLOYER_ORDER_SERVICES:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_ORDER_SERVICES_SUCCESS:
      return {
        ...state,
        orderSuccess: action.payload,
        isLoading: false,
      };
    case EMPLOYER_ORDER_SERVICES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    //emp get ordered services
    case EMPLOYER_GET_ORDERED_SERVICES:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_GET_ORDERED_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderList: action.payload,
      };
    case EMPLOYER_GET_ORDERED_SERVICES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    //emp get detail ordered service
    case EMPLOYER_GET_DETAIL_ORDERED_SERVICE:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYER_GET_DETAIL_ORDERED_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      };
    case EMPLOYER_GET_DETAIL_ORDERED_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ADMIN_GET_ORDERED_SERVICES:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_GET_ORDERED_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderList: action.payload,
      };
    case ADMIN_GET_ORDERED_SERVICES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ADMIN_UPDATE_STATUS_ORDERED_SERVICES:
      return {
        ...state,
        // isLoading: true,
      };
    case ADMIN_UPDATE_STATUS_ORDERED_SERVICES_SUCCESS:
      return {
        ...state,
        // isLoading: false,
      };
    case ADMIN_UPDATE_STATUS_ORDERED_SERVICES_FAILURE:
      return {
        ...state,
        // isLoading: false,
      };
    case EMPLOYER_GET_ACTIVE_SERVICES: {
      const orders = action.payload;

      const getActiveServices = (arr: any) => {
        let Arr: any = [];
        arr.forEach((item: any) => {
          item.order_detail.forEach((detailItem: any) => {
            Arr.push({
              id: detailItem.service_id,
              title: detailItem.name,
              createdAt: item.created_at,
              days: detailItem.days,
            });
          });
        });
        return Arr;
      };

      let processedOrders = orders.filter((item: any) => item.status === 2);

      let activeServices = getActiveServices(processedOrders);

      activeServices = activeServices.sort((a: any, b: any) => a.id - b.id);

      // console.log('Active services: ', activeServices);

      let buyNew: any = [];
      let extend: any = [];

      for (let i = 0; i < activeServices.length; i++) {
        if (activeServices[i + 1] !== undefined) {
          if (activeServices[i].id === activeServices[i + 1].id) {
            if (
              dayjs(activeServices[i].created_at).isAfter(
                dayjs(
                  dayjs(activeServices[i + 1].created_at).add(
                    activeServices[i + 1],
                    'day'
                  )
                )
              )
            ) {
              // console.log('Vào đây nè!');
              buyNew.push(activeServices[i]);
            } else {
              if (!extend.includes(activeServices[i])) {
                extend = extend.concat(
                  activeServices.filter(
                    (item: any) => item.id === activeServices[i].id
                  )
                );
              }
            }
          } else {
            // console.log('Vô đây nè!');
            if (!extend.includes(activeServices[i])) {
              buyNew.push(activeServices[i]);
            }
          }
        } else {
          // console.log('Undefined nên vô đây nè!');
          if (!extend.includes(activeServices[i])) {
            buyNew.push(activeServices[i]);
          }
        }
      }

      let counts: any = {};

      // console.log('buy new: ', buyNew);
      // console.log('extend: ', extend);

      const mergeArray = buyNew.concat(extend);

      mergeArray.forEach((item: any) => {
        counts[item.id] = (counts[item.id] || 0) + 1;
      });

      // console.log('count: ', counts);
      // console.log('merge services: ', mergeArray);

      const activeServicesWithExpireDate = mergeArray.map((item: any) => ({
        ...item,
        expireDate: dayjs(item.created_at).add(
          counts[item.id] * item.days,
          'day'
        ),
      }));

      // console.log('active with expire date', activeServicesWithExpireDate);

      const ActiveServices = uniqBy(
        activeServicesWithExpireDate.reverse(),
        'id'
      );

      return {
        ...state,
        activeServices: ActiveServices,
      };
    }

    default:
      return state;
  }
};

export default servicesReducer;
