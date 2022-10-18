import { call, takeEvery } from 'redux-saga/effects';

import { CREATE_JOB } from './actionTypes';
import employerServices from '../../services/employer';

function* createJob({ payload: { formData } }: any) {
  try {
    yield call(employerServices.createJob, formData);
  } catch (err) {
    console.log(err);
  }
}

function* jobsSaga() {
  yield takeEvery(CREATE_JOB, createJob);
}

export default jobsSaga;
