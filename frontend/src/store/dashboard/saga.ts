import { call, takeEvery, put } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import { getDashboardAdminFailure, getDashboardAdminSuccess } from './actions';
import { GET_DASHBOARD_ADMIN } from './actionTypes';

export function* getDashboardAdminSaga(): any {
  try {
    const res = yield call(adminServices.getDashboard);
    console.log(res);
    yield put(getDashboardAdminSuccess(res.data));
  } catch (err) {
    yield put(getDashboardAdminFailure());
  }
}

export function* dashboardSaga() {
  yield takeEvery(GET_DASHBOARD_ADMIN, getDashboardAdminSaga);
}
