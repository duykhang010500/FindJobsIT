import { takeEvery, call, put } from 'redux-saga/effects';

import { GET_MY_CV } from './actionTypes';

import { getMyCVFailure } from './actions';

import jobSeekerServices from '../../services/jobSeeker';

function* getMyCVSaga(): any {
  try {
    const res = yield call(jobSeekerServices.getCV);
    console.log('CV: ', res);
  } catch (error) {
    yield put(getMyCVFailure());
  }
}

function* cvSaga() {
  yield takeEvery(GET_MY_CV, getMyCVSaga);
}

export default cvSaga;
