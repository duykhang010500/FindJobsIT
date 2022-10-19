import { toast } from 'react-toastify';

import { takeEvery, call, put } from 'redux-saga/effects';

import adminServices from '../../services/admin';

import {
  closeModal,
  adminGetIndustriesList,
  adminGetIndustriesListSuccess,
} from './actions';

import {
  CREATE_INDUSTRY,
  UPDATE_INDUSTRY,
  DELETE_INDUSTRY,
  ADMIN_GET_INDUSTRIES_LIST,
} from './actionTypes';

export function* adminGetIndustriesListSaga(): any {
  try {
    const res = yield call(adminServices.getIndustriesList);
    yield put(adminGetIndustriesListSuccess(res.data.industries));
  } catch (err) {}
}

export function* createIndustrySaga({ payload: industry }: any): any {
  try {
    yield call(adminServices.createIndustry, industry);
    toast.success('Created industry successfully!');
    yield put(adminGetIndustriesList());
    yield put(closeModal());
  } catch (err) {
    console.log(err);
  }
}

export function* updateIndustrySaga({ payload: { industry, id } }: any): any {
  try {
    yield call(adminServices.updateIndustry, id, industry);
    toast.success('Updated industry successfully!');
    yield put(adminGetIndustriesList());
    yield put(closeModal());
  } catch (err) {
    throw err;
  }
}

export function* deleteIndustrySaga({ payload: id }: any): any {
  try {
    yield call(adminServices.deleteIndustry, id);
    toast.success('Deleted industry successfully!');
    yield put(adminGetIndustriesList());
    yield put(closeModal());
  } catch (err) {
    throw err;
  }
}

function* industriesSaga() {
  yield takeEvery(ADMIN_GET_INDUSTRIES_LIST, adminGetIndustriesListSaga);
  yield takeEvery(CREATE_INDUSTRY, createIndustrySaga);
  yield takeEvery(UPDATE_INDUSTRY, updateIndustrySaga);
  yield takeEvery(DELETE_INDUSTRY, deleteIndustrySaga);
}

export default industriesSaga;
