import { toast } from 'react-toastify';

import { takeEvery, call, put } from 'redux-saga/effects';

import adminServices from '../../services/admin';

import {
  closeModal,
  adminGetLocation,
  adminGetLocationSuccess,
} from './actions';

import {
  CREATE_LOCATION,
  UPDATE_LOCATION,
  ADMIN_GET_LOCATION,
  DELETE_LOCATION,
} from './actionTypes';

function* adminGetLocationSaga(): any {
  try {
    const res = yield call(adminServices.getLocationList);
    const list = res.data.locations;
    yield put(adminGetLocationSuccess(list));
  } catch (err) {
    console.log('Error: ', err);
  }
}

function* createLocationSaga({ payload: location }: any): any {
  try {
    yield call(adminServices.createLocation, location);
    yield put(adminGetLocation());
    yield put(closeModal());
    toast.success('Created new location successfully!');
  } catch (err) {}
}

function* updateLocationSaga({ payload: { location, id } }: any): any {
  try {
    yield call(adminServices.updateLocation, location, id);
    yield put(adminGetLocation());
    yield put(closeModal());
    toast.success('Updated location successfully!');
  } catch (err) {}
}

function* deleteLocationSaga({ payload: id }: any): any {
  try {
    yield call(adminServices.deleteLocation, id);
    yield put(adminGetLocation());
    toast.success('Deleted location successfully!');
  } catch (err) {}
}

function* locationSaga() {
  yield takeEvery(ADMIN_GET_LOCATION, adminGetLocationSaga);
  yield takeEvery(CREATE_LOCATION, createLocationSaga);
  yield takeEvery(UPDATE_LOCATION, updateLocationSaga);
  yield takeEvery(DELETE_LOCATION, deleteLocationSaga);
}

export default locationSaga;
