import { call, takeEvery, put } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import employerServices from '../../services/employer';
import {
  adminGetCandidatesListSuccess,
  getListCandidatesForEmployerSuccess,
} from './action';
import {
  ADMIN_GET_CANDIDATES_LIST,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
} from './actionTypes';

function* getListCandidatesForEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getCandidates);
    console.log('Get list candidate: ', response);
    yield put(getListCandidatesForEmployerSuccess(response.data.candidate));
  } catch (err) {
    throw err;
  }
}

function* adminGetCandidatesListSaga(): any {
  try {
    const res = yield call(adminServices.getCandidatesList);
    console.log('Res: ', res);
    const candidatesList = res.data.data;
    yield put(adminGetCandidatesListSuccess(candidatesList));
  } catch (err) {
    console.log('Err: ', err);
  }
}

function* candidatesSaga() {
  yield takeEvery(
    GET_LIST_CANDIDATES_FOR_EMPLOYER,
    getListCandidatesForEmployerSaga
  );
  yield takeEvery(ADMIN_GET_CANDIDATES_LIST, adminGetCandidatesListSaga);
}

export default candidatesSaga;
