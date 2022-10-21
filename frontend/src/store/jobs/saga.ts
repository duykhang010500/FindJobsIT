import { toast } from 'react-toastify';

import { put, call, takeEvery } from 'redux-saga/effects';

import { CREATE_JOB } from './actionTypes';
import { createJobFailure, createJobSuccess } from './actions';
import employerServices from '../../services/employer';

function* createJob({ payload: { formData, navigate } }: any) {
  try {
    yield call(employerServices.createJob, formData);
    yield put(createJobSuccess());
    toast.success('Create job successfully!');
    navigate('employer/hr/jobs/active');
  } catch (err) {
    yield put(createJobFailure(err));
  }
}

function* jobsSaga() {
  yield takeEvery(CREATE_JOB, createJob);
}

export default jobsSaga;
