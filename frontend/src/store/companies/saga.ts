import { toast } from 'react-toastify';

import {
  EMPLOYER_UPDATE_COMPANY,
  ADMIN_GET_COMPANIES_LIST,
} from './actionTypes';

import { call, put, takeEvery } from 'redux-saga/effects';

import adminServices from '../../services/admin';
import { getInfoEmployer } from '../auth/action';
import { adminGetCOmpaniesListSuccess } from './action';

import employerServices from '../../services/employer';

export function* adminGetCompaniesListSaga(): any {
  try {
    const res = yield call(adminServices.getCompaniesList);
    yield put(adminGetCOmpaniesListSuccess(res.data.data));
  } catch (err) {}
}

export function* employerUpdateCompanySaga({ payload: formData }: any): any {
  try {
    yield call(employerServices.updateCompany, formData);
    yield put(getInfoEmployer());
    toast.success('Updated information successfully!');
  } catch (err) {
    throw err;
  }
}

export default function* companiesSaga() {
  yield takeEvery(ADMIN_GET_COMPANIES_LIST, adminGetCompaniesListSaga);
  yield takeEvery(EMPLOYER_UPDATE_COMPANY, employerUpdateCompanySaga);
}
