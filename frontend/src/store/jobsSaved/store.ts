import { toast } from 'react-toastify';
import { takeEvery, call, put } from 'redux-saga/effects';

import jobSeekerServices from '../../services/jobSeeker';
import { getJobsSaved, getJobsSavedSuccess } from './action';
import { DELETE_JOBS_SAVED, GET_JOBS_SAVED, SAVE_JOB } from './actionTypes';

function* saveJobSaga({ payload }: any): any {
  try {
    yield call(jobSeekerServices.savedJob, payload);
    toast.success('Job has been saved!');
  } catch (err) {
    toast.error('Job has been in saved list!');
  }
}

function* getJobsSavedSaga(): any {
  try {
    const res = yield call(jobSeekerServices.getSavedJobs);
    yield put(getJobsSavedSuccess(res.data));
  } catch (err) {}
}

function* deleteJobSavedSaga({ payload }: any): any {
  try {
    yield call(jobSeekerServices.deleteJobSaved, payload);
    toast.success('Delete saved job successfully!');
    yield put(getJobsSaved());
  } catch (err) {}
}

function* jobsSavedSaga() {
  yield takeEvery(SAVE_JOB, saveJobSaga);
  yield takeEvery(GET_JOBS_SAVED, getJobsSavedSaga);
  yield takeEvery(DELETE_JOBS_SAVED, deleteJobSavedSaga);
}

export default jobsSavedSaga;
