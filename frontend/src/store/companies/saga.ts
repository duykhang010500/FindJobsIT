import { ADMIN_GET_COMPANIES_LIST } from './actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import { adminGetCOmpaniesListSuccess } from './action';

export function* adminGetCompaniesListSaga(): any {
  try {
    const res = yield call(adminServices.getCompaniesList);
    console.log('Companies list: ', res);
    yield put(adminGetCOmpaniesListSuccess(res.data.data));
  } catch (err) {}
}

export default function* companiesSaga() {
  yield takeEvery(ADMIN_GET_COMPANIES_LIST, adminGetCompaniesListSaga);
}
