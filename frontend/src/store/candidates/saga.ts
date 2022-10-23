import { toast } from 'react-toastify';
import { call, takeEvery, put } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import employerServices from '../../services/employer';
import {
  adminGetCandidatesListSuccess,
  getListCandidatesForEmployerSuccess,
} from './action';
import {
  ADMIN_GET_CANDIDATES_LIST,
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

function* updateStatus({ payload: { id, formData } }: any): any {
  yield call(employerServices.updateStatus, id, formData);
  yield put(getListCandidatesForEmployerSaga());
  toast.success('Update status successfully!');
}

function* candidatesSaga() {
  yield takeEvery(
    GET_LIST_CANDIDATES_FOR_EMPLOYER,
    getListCandidatesForEmployerSaga
  );
  yield takeEvery(ADMIN_GET_CANDIDATES_LIST, adminGetCandidatesListSaga);
  yield takeEvery(UPDATE_STATUS, updateStatus);
}

export default candidatesSaga;
