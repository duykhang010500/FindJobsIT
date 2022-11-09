import { takeEvery, call, put } from 'redux-saga/effects';

import { GET_MY_CV, UPDATE_MY_CV } from './actionTypes';

import {
  getMyCV,
  getMyCVFailure,
  getMyCVSuccess,
  updateMyCvFailure,
} from './actions';

import jobSeekerServices from '../../services/jobSeeker';
import { toast } from 'react-toastify';
import { getCurrentJobSeeker } from '../auth/action';

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
    yield call(jobSeekerServices.updateCV, formData);
    toast.success('Update resume successfully!');
    yield put(getMyCV());
    yield put(getCurrentJobSeeker());
  } catch (err) {
    yield put(updateMyCvFailure(err));
    toast.error('Err occur!');
  }
}

function* cvSaga() {
  yield takeEvery(GET_MY_CV, getMyCVSaga);
  yield takeEvery(UPDATE_MY_CV, updateMyCVSaga);
}

export default cvSaga;
