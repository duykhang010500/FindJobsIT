import { toast } from 'react-toastify';
import { call, takeEvery, put } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import employerServices from '../../services/employer';
import {
  adminGetCandidatesListSuccess,
  getDetailCandidateSuccess,
  getListCandidatesForEmployerSuccess,
} from './action';
import {
  ADMIN_GET_CANDIDATES_LIST,
  GET_DETAIL_CANDIDATE,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  UPDATE_STATUS,
} from './actionTypes';

function* getListCandidatesForEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getCandidates);
    yield put(getListCandidatesForEmployerSuccess(response.data.candidate));
  } catch (err) {
    throw err;
  }
}

function* adminGetCandidatesListSaga(): any {
  try {
    const res = yield call(adminServices.getCandidatesList);
    console.log('Res: ', res);
    const candidatesList = res.data.data;
    yield put(adminGetCandidatesListSuccess(candidatesList));
  } catch (err) {
    console.log('Err: ', err);
  }
}

function* updateStatusSaga({ payload: { id, formData } }: any): any {
  try {
    console.log(id, formData);
    yield call(employerServices.updateStatus, id, formData);
    toast.success('Update status successfully!');
  } catch (err) {
    toast.error('Update status failure!');
  }
}

function* getCandidateSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.getDetailCandidate, payload);
    yield put(getDetailCandidateSuccess(res.data.candidate));
  } catch (err) {
    console.log('Error: ', err);
  }
}

function* candidatesSaga() {
  yield takeEvery(
    GET_LIST_CANDIDATES_FOR_EMPLOYER,
    getListCandidatesForEmployerSaga
  );
  yield takeEvery(ADMIN_GET_CANDIDATES_LIST, adminGetCandidatesListSaga);
  yield takeEvery(UPDATE_STATUS, updateStatusSaga);
  yield takeEvery(GET_DETAIL_CANDIDATE, getCandidateSaga);
}

export default candidatesSaga;
