import { call, put, takeEvery } from 'redux-saga/effects';
import employerServices from '../../services/employer';
import { CREATE_JOB } from './actionTypes';

function* createJob({ payload: { formData } }: any) {
  try {
    console.log('formData in saga: ', formData);
    yield call(employerServices.createJob, formData);
  } catch (err) {
    console.log(err);
  }
}

function* jobsSaga() {
  yield takeEvery(CREATE_JOB, createJob);
}

export default jobsSaga;
