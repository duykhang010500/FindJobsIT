import { toast } from 'react-toastify';

import { put, call, takeEvery } from 'redux-saga/effects';

import { CREATE_JOB, EMPLOYER_GET_JOBS } from './actionTypes';
import {
  createJobFailure,
  createJobSuccess,
  employerGetJobsSuccess,
} from './actions';

import employerServices from '../../services/employer';

function* createJob({ payload: { formData, navigate } }: any) {
  try {
    yield call(employerServices.createJob, formData);
    yield put(createJobSuccess());
    toast.success('Create job successfully!');
    navigate('/employer/hr/jobs/active');
  } catch (err) {
    yield put(createJobFailure(err));
  }
}

function* employerGetJobs(): any {
  try {
    const res = yield call(employerServices.getJobs);
    yield put(employerGetJobsSuccess(res.data.job));
  } catch (err) {
    throw err;
  }
}

function* jobsSaga() {
  yield takeEvery(CREATE_JOB, createJob);
  yield takeEvery(EMPLOYER_GET_JOBS, employerGetJobs);
}

export default jobsSaga;
