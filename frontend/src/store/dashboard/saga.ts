import { call, takeEvery, put } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import employerServices from '../../services/employer';
import {
  getDashboardAdminFailure,
  getDashboardAdminSuccess,
  getDashboardEmployerSuccess,
} from './actions';
import { GET_DASHBOARD_ADMIN, GET_DASHBOARD_EMPLOYER } from './actionTypes';

export function* getDashboardAdminSaga(): any {
  try {
    const res = yield call(adminServices.getDashboard);
    console.log(res);
    yield put(getDashboardAdminSuccess(res.data));
  } catch (err) {
    yield put(getDashboardAdminFailure());
  }
}

export function* getDashboardEmployerSaga(): any {
  try {
    const res = yield call(employerServices.getDashboard);
    console.log('Employer dashboard: ', res);
    yield put(getDashboardEmployerSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

export function* dashboardSaga() {
  yield takeEvery(GET_DASHBOARD_ADMIN, getDashboardAdminSaga);
  yield takeEvery(GET_DASHBOARD_EMPLOYER, getDashboardEmployerSaga);
}
