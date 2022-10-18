import { takeEvery, put, call } from 'redux-saga/effects';

import adminServices from '../../services/admin';
import employerServices from '../../services/employer';

import {
  CREATE_SERVICE,
  ADMIN_GET_SERVICES_LIST,
  GET_LIST_SERVICES_EMPLOYER,
} from './actionTypes';

import {
  adminGetServicesListSuccess,
  getListServicesEmployerSuccess,
} from './actions';

export function* getListServicesEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getListServices);
    console.log('List of service of employer: ', response);
    yield put(getListServicesEmployerSuccess(response.data.services));
  } catch (err) {
    throw err;
  }
}

export function* createServiceSaga(formData: any): any {
  try {
    const res = yield call(adminServices.createService, formData);
    console.log('Created service: ', res);
    // yield put(adminGetServicesListSuccess(res));
  } catch (err) {
    throw err;
  }
}

export function* adminGetServicesListSaga(): any {
  try {
    const res = yield call(adminServices.getServicesList);
    console.log('List of services: ', res);
  } catch (err) {}
}

export function* servicesSaga() {
  yield takeEvery(GET_LIST_SERVICES_EMPLOYER, getListServicesEmployerSaga);
  yield takeEvery(CREATE_SERVICE, createServiceSaga);
  yield takeEvery(ADMIN_GET_SERVICES_LIST, adminGetServicesListSaga);
}

export default servicesSaga;
