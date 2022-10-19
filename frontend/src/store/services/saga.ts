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
} from './actionTypes';

import {
  adminGetServicesListSuccess,
  createServiceFailure,
  createServiceSuccess,
  getListServicesEmployerSuccess,
  updateServiceFailure,
  updateServiceSuccess,
  deleteServiceSuccess,
} from './actions';
import { DeleteService } from './types';

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

export function* servicesSaga() {
  yield takeEvery(GET_LIST_SERVICES_EMPLOYER, getListServicesEmployerSaga);
  yield takeEvery(CREATE_SERVICE, createServiceSaga);
  yield takeEvery(ADMIN_GET_SERVICES_LIST, adminGetServicesListSaga);
  yield takeEvery(UPDATE_SERVICE, updateServiceSaga);
  yield takeEvery(DELETE_SERVICE, deleteServiceSaga);
}

export default servicesSaga;
