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
  GET_PENDING_JOBS,
  APPROVE_JOBS,
  GET_ACTIVE_JOBS,
  GET_REJECTED_JOBS,
  EMPLOYER_UPDATE_STATUS_JOB,
  ADMIN_GET_DETAIL_JOB,
  GET_OTHER_JOBS,
  APPLY_JOB_SUCCESS,
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
  getPendingJobsSuccess,
  getPendingJobs,
  GetRejectedJobsSuccess,
  GetActiveJobsSuccess,
  GetActiveJobs,
  GetRejectedJobs,
  adminGetDetailJobSuccess,
  getOtherJobsSuccess,
  applyJobSuccess,
  applyJobFailure,
  getJobsApplied,
  getPendingJobsFailure,
  GetActiveJobsFailure,
  GetRejectedJobsFailure,
} from './actions';

import guestServices from '../../services/guest';
import employerServices from '../../services/employer';
import jobSeekerServices from '../../services/jobSeeker';
import adminServices from '../../services/admin';

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
    console.log('Get jobs paging: ', res);
    yield put(
      getJobsSuccess(
        res.data.result.data,
        res.data.result.current_page,
        res.data.result.total,
        res.data.result.last_page
      )
    );
  } catch (err) {}
}

function* getJob({ payload: id }: any): any {
  try {
    const res = yield call(guestServices.getJob, id);
    yield put(getJobSuccess(res.data.job));
  } catch (err) {
    console.log(err);
  }
}

function* getOtherJobsSaga({ payload }: any): any {
  try {
    const res = yield call(guestServices.getOtherJobs, payload);
    // console.log('Relevant jobs: ', res);
    yield put(getOtherJobsSuccess(res.data.result.data));
  } catch (err) {
    console.log(err);
  }
}

function* employerGetJobsSaga(): any {
  try {
    const res = yield call(employerServices.getJobs);
    yield put(employerGetJobsSuccess(res.data.job.reverse()));
  } catch (err) {
    console.log(err);
  }
}

function* applyJobSaga({ payload: { id, formData } }: any): any {
  try {
    yield call(jobSeekerServices.applyJob, id, formData);
    toast.success('Apply job success!');
    yield put(applyJobSuccess());
    yield put(getJobsApplied());
  } catch (err: any) {
    toast.error(err.message);
    yield put(applyJobFailure());
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
    yield put(getJobsAppliedSuccess(res.data.history.reverse()));
  } catch (err) {
    console.log(err);
  }
}

function* getPendingJobsSaga(): any {
  try {
    const res = yield call(adminServices.getJobs, 'all');
    yield put(getPendingJobsSuccess(res.data.JobsPendings.reverse()));
  } catch (err) {
    console.log(err);
    yield put(getPendingJobsFailure());
  }
}

function* approveJobSaga({ payload }: any): any {
  try {
    const { jobId, status } = payload;
    yield call(adminServices.approveJob, jobId, status);
    toast.success('Update successfully!');
    yield put(getPendingJobs());
    yield put(GetActiveJobs());
    yield put(GetRejectedJobs());
  } catch (error) {
    toast.error('Somethings went wrong!');
  }
}

function* getActiveJobsSagas(): any {
  try {
    const res = yield call(adminServices.getJobs, 'active');
    yield put(GetActiveJobsSuccess(res.data.JobsPendings));
  } catch (error) {
    yield put(GetActiveJobsFailure());
  }
}

function* getRejectedJobsSaga(): any {
  try {
    const res = yield call(adminServices.getJobs, 'reject');
    yield put(GetRejectedJobsSuccess(res.data.JobsPendings));
  } catch (error) {
    yield put(GetRejectedJobsFailure());
  }
}

function* employerUpdateJobStatusSaga({ payload }: any): any {
  try {
    console.log('Update job status: ', payload);
    yield call(employerServices.updateJobStatus, payload.jobID, payload.status);
    yield put(employerGetJobs());
    toast.success('Update successfully!');
  } catch (err) {
    toast.error('Update failure!');
  }
}

function* adminGetDetailJobSaga({ payload }: any): any {
  try {
    const res = yield call(adminServices.getDetailJob, payload);
    console.log('ADMIN GET DETAIL JOB: ', res);
    yield put(adminGetDetailJobSuccess(res.data.job));
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
  yield takeEvery(GET_PENDING_JOBS, getPendingJobsSaga);
  yield takeEvery(APPROVE_JOBS, approveJobSaga);
  yield takeEvery(GET_ACTIVE_JOBS, getActiveJobsSagas);
  yield takeEvery(GET_REJECTED_JOBS, getRejectedJobsSaga);
  yield takeEvery(EMPLOYER_UPDATE_STATUS_JOB, employerUpdateJobStatusSaga);
  yield takeEvery(ADMIN_GET_DETAIL_JOB, adminGetDetailJobSaga);
  yield takeEvery(GET_OTHER_JOBS, getOtherJobsSaga);
}

export default jobsSaga;
