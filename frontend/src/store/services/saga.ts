import { toast } from 'react-toastify';

import { takeEvery, put, call } from 'redux-saga/effects';

import adminServices from '../../services/admin';
import employerServices from '../../services/employer';

import {
  CREATE_SERVICE,
  ADMIN_GET_SERVICES_LIST,
  GET_LIST_SERVICES_EMPLOYER,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  EMPLOYER_ORDER_SERVICES,
  EMPLOYER_GET_ORDERED_SERVICES,
  EMPLOYER_GET_DETAIL_ORDERED_SERVICE,
  ADMIN_GET_ORDERED_SERVICES,
  ADMIN_UPDATE_STATUS_ORDERED_SERVICES,
} from './actionTypes';

import {
  adminGetServicesListSuccess,
  createServiceFailure,
  createServiceSuccess,
  getListServicesEmployerSuccess,
  updateServiceFailure,
  updateServiceSuccess,
  deleteServiceSuccess,
  employerOrderServicesSuccess,
  employerGetOrderedServicesSuccess,
  adminGetOrderedServicesSuccess,
  adminGetOrderedServices,
  employerActiveServices,
  clearCart,
} from './actions';
import { DeleteService } from './types';

export function* getListServicesEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getListServices);
    // console.log('List of service of employer: ', response);
    yield put(getListServicesEmployerSuccess(response.data.services));
  } catch (err) {
    throw err;
  }
}

export function* createServiceSaga(formData: any): any {
  try {
    yield call(adminServices.createService, formData.payload);
    toast.success('Create service successfully!');
    yield put(createServiceSuccess());
  } catch (err) {
    yield put(createServiceFailure(err));
  }
}

export function* adminGetServicesListSaga(): any {
  try {
    const res = yield call(adminServices.getServicesList);
    yield put(adminGetServicesListSuccess(res.data.services));
  } catch (err) {}
}

export function* updateServiceSaga({
  payload: { formData, id, navigate },
}: any): any {
  try {
    yield call(adminServices.updateService, id, formData);
    yield put(updateServiceSuccess());
    toast.success('Update service successfully!');
  } catch (err) {
    console.log('Error: ', err);
    yield put(updateServiceFailure(err));
  }
}

export function* deleteServiceSaga({ payload: id }: DeleteService): any {
  try {
    const res = yield call(adminServices.deleteService, id);
    if (res.status === 200) {
      toast.success('Delete service successfully!');
      yield put(deleteServiceSuccess(id));
    }
  } catch (err) {
    throw err;
  }
}

export function* employerOrderServicesSaga({
  payload: { formData, navigate },
}: any): any {
  try {
    const res = yield call(employerServices.orderServices, formData);
    // console.log('emp order services :', res);
    toast.success('Order services successfully!');
    navigate(`/employer/services/order-success/${res.data.order.code}`);
    yield put(clearCart());
    yield put(employerOrderServicesSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

export function* employerGetOrderedServicesSaga(): any {
  try {
    const res = yield call(employerServices.getOrderedServices);
    console.log('emp get ordered services: ', res);
    yield put(employerGetOrderedServicesSuccess(res.data.orders));
    console.log(res.data.orders);
    yield put(employerActiveServices(res.data.orders));
  } catch (err) {
    console.log(err);
  }
}

export function* employerGetDetailOrderedServiceSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.getDetailOrderedService, payload);
    console.log('emp get detail ordered services: ', res);
  } catch (err) {
    console.log(err);
  }
}

//admin management ordered services

export function* adminGetOrderedServicesSaga(): any {
  try {
    const res = yield call(adminServices.getOrderedServices);
    yield put(adminGetOrderedServicesSuccess(res.data.orders));
    // console.log('Admin get ordered services: ', res.data.orders);
  } catch (err) {
    console.log(err);
  }
}

export function* adminUpdateOrderedServicesStatusSaga({
  payload: { orderID, status },
}: any): any {
  try {
    const res = yield call(adminServices.changeStatusOrder, orderID, status);
    console.log('res update ordered status: ', res);
    yield put(adminGetOrderedServices());
    toast.success('Update status order successfully!');
  } catch (err) {}
}

export function* servicesSaga() {
  yield takeEvery(GET_LIST_SERVICES_EMPLOYER, getListServicesEmployerSaga);
  yield takeEvery(CREATE_SERVICE, createServiceSaga);
  yield takeEvery(ADMIN_GET_SERVICES_LIST, adminGetServicesListSaga);
  yield takeEvery(UPDATE_SERVICE, updateServiceSaga);
  yield takeEvery(DELETE_SERVICE, deleteServiceSaga);
  yield takeEvery(EMPLOYER_ORDER_SERVICES, employerOrderServicesSaga);
  yield takeEvery(
    EMPLOYER_GET_ORDERED_SERVICES,
    employerGetOrderedServicesSaga
  );
  yield takeEvery(
    EMPLOYER_GET_DETAIL_ORDERED_SERVICE,
    employerGetDetailOrderedServiceSaga
  );
  yield takeEvery(ADMIN_GET_ORDERED_SERVICES, adminGetOrderedServicesSaga);
  yield takeEvery(
    ADMIN_UPDATE_STATUS_ORDERED_SERVICES,
    adminUpdateOrderedServicesStatusSaga
  );
}

export default servicesSaga;
