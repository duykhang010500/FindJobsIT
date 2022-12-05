import { Office } from './types';
import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import employerServices from '../../services/employer';
import {
  closeModal,
  createOfficesSuccess,
  deleteOfficeSuccess,
  getOfficesSuccess,
  getOfficeSuccess,
  openModal,
  updateOfficeSuccess,
} from './actions';
import {
  CREATE_OFFICE,
  DELETE_OFFICE,
  GET_OFFICE,
  GET_OFFICES,
  UPDATE_OFFICE,
} from './actionTypes';

export function* createOfficeSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.createOffice, payload);
    yield put(createOfficesSuccess(res.data.office));
    yield put(closeModal());
    toast.success('Create office success!');
  } catch (err) {
    console.log(err);
  }
}

export function* getOfficesSaga(): any {
  try {
    const res = yield call(employerServices.getOffices);
    yield put(getOfficesSuccess(res.data.offices.reverse()));
  } catch (err) {}
}

export function* getOfficeSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.getOffice, payload);
    yield put(getOfficeSuccess(res.data.office));
    yield put(openModal());
  } catch (err) {}
}

export function* updateOfficeSaga({ payload }: any): any {
  try {
    const res = yield call(
      employerServices.updateOffice,
      payload.id,
      payload.office
    );
    yield put(updateOfficeSuccess(res.data.office));
    toast.success('Update successfully!');
  } catch (err) {}
}

export function* deleteOfficeSaga({ payload }: any): any {
  try {
    yield call(employerServices.deleteOffice, payload);
    yield put(deleteOfficeSuccess(payload));
    toast.success('Delete successfully!');
  } catch (err) {}
}

function* officesSaga() {
  yield takeEvery(CREATE_OFFICE, createOfficeSaga);
  yield takeEvery(GET_OFFICES, getOfficesSaga);
  yield takeEvery(GET_OFFICE, getOfficeSaga);
  yield takeEvery(UPDATE_OFFICE, updateOfficeSaga);
  yield takeEvery(DELETE_OFFICE, deleteOfficeSaga);
}

export default officesSaga;
