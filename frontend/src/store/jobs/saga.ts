import { toast } from 'react-toastify';

import { put, call, takeEvery } from 'redux-saga/effects';

import {
  GET_JOB,
  GET_JOBS,
  APPLY_JOB,
  CREATE_JOB,
  EMPLOYER_GET_JOBS,
} from './actionTypes';

import {
  getJobSuccess,
  getJobsSuccess,
  createJobFailure,
  createJobSuccess,
  employerGetJobsSuccess,
} from './actions';

import guestServices from '../../services/guest';
import employerServices from '../../services/employer';
import jobSeekerServices from '../../services/jobSeeker';

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

function* getJobsSaga(): any {
  try {
    const res = yield call(guestServices.getJobs);
    yield put(getJobsSuccess(res.data.result.data));
  } catch (err) {}
}

function* getJob({ payload: id }: any): any {
  try {
    const res = yield call(guestServices.getJob, id);
    yield put(getJobSuccess(res.data.job));
  } catch (err) {
    throw err;
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

function* applyJobSaga({ payload: { id, formData } }: any): any {
  try {
    yield call(jobSeekerServices.applyJob, id, formData);
    toast.success('Apply job success!');
  } catch (err) {
    throw err;
  }
}

function* jobsSaga() {
  yield takeEvery(CREATE_JOB, createJob);
  yield takeEvery(GET_JOBS, getJobsSaga);
  yield takeEvery(GET_JOB, getJob);
  yield takeEvery(EMPLOYER_GET_JOBS, employerGetJobs);
  yield takeEvery(APPLY_JOB, applyJobSaga);
}

export default jobsSaga;
