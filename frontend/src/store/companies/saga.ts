import { toast } from 'react-toastify';

import {
  EMPLOYER_UPDATE_COMPANY,
  ADMIN_GET_COMPANIES_LIST,
  GET_COMPANIES,
  GET_COMPANY,
  ADMIN_GET_COMPANIES_PENDING,
  ADMIN_GET_COMPANIES_ACTIVE,
  ADMIN_GET_COMPANIES_REJECTED,
  ADMIN_UPDATE_COMPANY_STATUS,
} from './actionTypes';

import { call, put, takeEvery } from 'redux-saga/effects';

import adminServices from '../../services/admin';
import { getInfoEmployer } from '../auth/action';
import {
  adminGetCOmpaniesListSuccess,
  adminGetCompaniesPendingSuccess,
  adminUpdateCompanyStatusSuccess,
  getCompanies,
  getCompaniesSuccess,
  getCompanySuccess,
} from './action';

import employerServices from '../../services/employer';
import guestServices from '../../services/guest';

export function* adminGetCompaniesListSaga(): any {
  try {
    const res = yield call(adminServices.getCandidatesList);
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

export function* getCompaniesSaga(): any {
  try {
    const res = yield call(guestServices.getAllCompany);
    console.log('List of companies: ', res);
    yield put(getCompaniesSuccess(res.data.companies));
  } catch (err) {
    throw err;
  }
}

export function* getCompanySaga({ payload }: any): any {
  try {
    const res = yield call(guestServices.getCompany, payload);
    console.log('Company: ', res);
    yield put(getCompanySuccess(res.data.company));
  } catch (err) {
    console.log(err);
  }
}

export function* adminGetCompaniesPendingSaga(): any {
  try {
    const res = yield call(adminServices.getCompaniesList, 'pending');
    console.log('Companies pending: ', res);
    yield put(adminGetCompaniesPendingSuccess(res.data.companiesPendings));
  } catch (err) {
    console.log(err);
  }
}

export function* adminGetCompaniesActiveSaga(): any {
  try {
    const res = yield call(adminServices.getCompaniesList, 'active');
    console.log('Companies active: ', res);
    yield put(adminGetCompaniesPendingSuccess(res.data.companiesActive));
  } catch (err) {
    console.log(err);
  }
}

export function* adminGetCompaniesRejectedSaga(): any {
  try {
    const res = yield call(adminServices.getCompaniesList, 'reject');
    console.log('Companies rejected: ', res);
    yield put(adminGetCompaniesPendingSuccess(res.data.companiesReject));
  } catch (err) {
    console.log(err);
  }
}

export function* adminUpdateCompanyStatusSaga({ payload }: any): any {
  try {
    console.log(payload);
    const res = yield call(
      adminServices.updateCompanyStatus,
      payload.id,
      payload.status
    );
    toast.success('Update status successfully!');
    yield put(adminUpdateCompanyStatusSuccess(payload.id, payload.status));
  } catch (err) {
    console.log(err);
  }
}

export default function* companiesSaga() {
  yield takeEvery(ADMIN_GET_COMPANIES_LIST, adminGetCompaniesListSaga);
  yield takeEvery(EMPLOYER_UPDATE_COMPANY, employerUpdateCompanySaga);
  yield takeEvery(GET_COMPANIES, getCompaniesSaga);
  yield takeEvery(GET_COMPANY, getCompanySaga);
  yield takeEvery(ADMIN_GET_COMPANIES_PENDING, adminGetCompaniesPendingSaga);
  yield takeEvery(ADMIN_GET_COMPANIES_ACTIVE, adminGetCompaniesActiveSaga);
  yield takeEvery(ADMIN_GET_COMPANIES_REJECTED, adminGetCompaniesRejectedSaga);
  yield takeEvery(ADMIN_UPDATE_COMPANY_STATUS, adminUpdateCompanyStatusSaga);
}
