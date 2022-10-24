import { takeEvery, call, put } from 'redux-saga/effects';

import { GET_MY_CV, UPDATE_MY_CV } from './actionTypes';

import { getMyCVFailure, getMyCVSuccess } from './actions';

import jobSeekerServices from '../../services/jobSeeker';

function* getMyCVSaga(): any {
  try {
    const res = yield call(jobSeekerServices.getCV);
    yield put(getMyCVSuccess(res.data.resume));
  } catch (error) {
    yield put(getMyCVFailure());
  }
}

function* updateMyCVSaga({ payload: formData }: any): any {
  try {
    const res = yield call(jobSeekerServices.updateCV, formData);
  } catch (err) {
    throw err;
  }
}

function* cvSaga() {
  yield takeEvery(GET_MY_CV, getMyCVSaga);
  yield takeEvery(UPDATE_MY_CV, updateMyCVSaga);
}

export default cvSaga;
