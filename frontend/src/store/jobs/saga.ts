import { toast } from 'react-toastify';

import { put, call, takeEvery } from 'redux-saga/effects';

import {
  GET_JOB,
  GET_JOBS,
  APPLY_JOB,
  CREATE_JOB,
  EMPLOYER_GET_JOBS,
  SEARCH_JOB,
  UPDATE_JOB,
  EMPLOYER_DELETE_JOB,
  GET_JOBS_APPLIED,
} from './actionTypes';

import {
  getJobSuccess,
  getJobsSuccess,
  createJobFailure,
  createJobSuccess,
  employerGetJobsSuccess,
  searchJobsSuccess,
  updateJobFailure,
  // applyJobFailure,
  employerDeleteJobFailure,
  employerGetJobs,
  getJobsAppliedSuccess,
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
    toast.error('Create job failure!');
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

function* employerGetJobsSaga(): any {
  try {
    const res = yield call(employerServices.getJobs);
    yield put(employerGetJobsSuccess(res.data.job.reverse()));
  } catch (err) {
    throw err;
  }
}

function* applyJobSaga({ payload: { id, formData } }: any): any {
  try {
    console.log('Form data apply job!', formData);
    yield call(jobSeekerServices.applyJob, id, formData);
    toast.success('Apply job success!');
  } catch (err: any) {
    toast.error(err.message);
  }
}

function* searchJobs({
  payload: { keywords, locations, industries },
}: any): any {
  try {
    const res = yield call(
      guestServices.searchJob,
      keywords,
      locations,
      industries
    );

    yield put(searchJobsSuccess(res.data.result.data));
  } catch (err) {
    throw err;
  }
}

function* updateJobSaga({ payload: { id, formData, navigate } }: any): any {
  try {
    yield call(employerServices.updateJob, id, formData);
    toast.success('Update job success!');
    navigate('/employer/hr/jobs/active');
  } catch (err) {
    toast.error('Update job failure!');
    yield put(updateJobFailure(err));
  }
}

function* employerDeleteJobSaga({ payload: id }: any): any {
  try {
    yield call(employerServices.deleteJob, id);
    toast.success('Delete job successfully!');
    yield put(employerGetJobs());
  } catch (error) {
    yield employerDeleteJobFailure(error);
  }
}

function* getJobsAppliedSaga(): any {
  try {
    const res = yield call(jobSeekerServices.getJobsApplied);
    yield put(getJobsAppliedSuccess(res.data.history));
  } catch (err) {
    console.log(err);
  }
}

function* jobsSaga() {
  yield takeEvery(CREATE_JOB, createJob);
  yield takeEvery(GET_JOBS, getJobsSaga);
  yield takeEvery(GET_JOB, getJob);
  yield takeEvery(EMPLOYER_GET_JOBS, employerGetJobsSaga);
  yield takeEvery(APPLY_JOB, applyJobSaga);
  yield takeEvery(SEARCH_JOB, searchJobs);
  yield takeEvery(UPDATE_JOB, updateJobSaga);
  yield takeEvery(EMPLOYER_DELETE_JOB, employerDeleteJobSaga);
  yield takeEvery(GET_JOBS_APPLIED, getJobsAppliedSaga);
}

export default jobsSaga;
