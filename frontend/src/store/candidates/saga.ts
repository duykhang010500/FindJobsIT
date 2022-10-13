import { call, takeEvery, put } from 'redux-saga/effects';
import employerServices from '../../services/employer';
import { getListCandidatesForEmployerSuccess } from './action';
import { GET_LIST_CANDIDATES_FOR_EMPLOYER } from './actionTypes';

function* getListCandidatesForEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getCandidates);
    console.log('Get list candidate: ', response);
    yield put(getListCandidatesForEmployerSuccess(response.data.candidate));
  } catch (err) {
    throw err;
  }
}

function* candidatesSaga() {
  yield takeEvery(
    GET_LIST_CANDIDATES_FOR_EMPLOYER,
    getListCandidatesForEmployerSaga
  );
}

export default candidatesSaga;
