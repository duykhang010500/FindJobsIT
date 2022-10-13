import { takeEvery, put, call } from 'redux-saga/effects';
import employerServices from '../../services/employer';
import { getListServicesEmployerSuccess } from './actions';
import { GET_LIST_SERVICES_EMPLOYER } from './actionTypes';

export function* getListServicesEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getListServices);
    console.log('List of service: ', response);
    yield put(getListServicesEmployerSuccess(response.data.services));
  } catch (err) {
    throw err;
  }
}
export function* servicesSaga() {
  yield takeEvery(GET_LIST_SERVICES_EMPLOYER, getListServicesEmployerSaga);
}

export default servicesSaga;
