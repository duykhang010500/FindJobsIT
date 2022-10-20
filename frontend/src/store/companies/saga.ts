import {
  ADMIN_GET_COMPANIES_LIST,
  EMPLOYER_UPDATE_COMPANY,
} from './actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import { adminGetCOmpaniesListSuccess } from './action';
import employerServices from '../../services/employer';
import { getInfoEmployer } from '../auth/action';

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
  } catch (err) {
    throw err;
  }
}

export default function* companiesSaga() {
  yield takeEvery(ADMIN_GET_COMPANIES_LIST, adminGetCompaniesListSaga);
  yield takeEvery(EMPLOYER_UPDATE_COMPANY, employerUpdateCompanySaga);
}
