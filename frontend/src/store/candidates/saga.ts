import { toast } from 'react-toastify';
import { call, takeEvery, put } from 'redux-saga/effects';
import adminServices from '../../services/admin';
import employerServices from '../../services/employer';
import guestServices from '../../services/guest';
import {
  adminGetCandidatesListSuccess,
  employerGetSentListMailSuccess,
  employerSendMailFailure,
  employerSendMailSuccess,
  getDetailCandidateFailure,
  getDetailCandidateSuccess,
  getDetailResumeCandidateSuccess,
  getListCandidatesForEmployerSuccess,
  searchCandidateSuccess,
} from './action';
import {
  ADMIN_GET_CANDIDATES_LIST,
  DELETE_SAVED_CANDIDATE,
  EMPLOYER_GET_SENT_MAIL_LIST,
  EMPLOYER_SEND_MAIL,
  GET_DETAIL_CANDIDATE,
  GET_DETAIL_RESUME_CANDIDATE,
  GET_LIST_CANDIDATES_FOR_EMPLOYER,
  GET_SAVED_CANDIDATES,
  SAVE_CANDIDATE,
  SEARCH_CANDIDATES,
  UPDATE_STATUS,
} from './actionTypes';

function* getListCandidatesForEmployerSaga(): any {
  try {
    const response = yield call(employerServices.getCandidates);
    yield put(
      getListCandidatesForEmployerSuccess(response.data.candidate.reverse())
    );
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

function* searchCandidatesSaga({ payload }: any): any {
  try {
    const res = yield call(guestServices.searchCandidates, payload);
    yield put(searchCandidateSuccess(res.data.result.data));
  } catch (err) {}
}

function* getDetailResumeCandidateSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.getDetailResumeCandidate, payload);
    yield put(getDetailResumeCandidateSuccess(res.data.resume));
  } catch (err) {
    yield put(getDetailCandidateFailure(err));
  }
}

function* saveCandidateSaga({ payload }: any): any {
  try {
  } catch (err) {}
}

function* getSavedCandidatesSaga(): any {
  try {
  } catch (err) {}
}

function* deleteSavedCandidateSaga({ payload }: any): any {
  try {
  } catch (err) {}
}

function* sendMailSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.sendMail, payload);
    console.log('send mail res: ', res);
    toast.success('Send mail successfully!');
    yield put(employerSendMailSuccess({}));
  } catch (err) {
    toast.error('Send mail failure');
    yield put(employerSendMailFailure(err));
    console.log(err);
  }
}

function* employerGetSentMailListSaga(): any {
  try {
    const res = yield call(employerServices.getSentMailList);
    yield put(employerGetSentListMailSuccess(res.data.listMail.reverse()));
  } catch (err) {
    console.log(err);
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
  yield takeEvery(SEARCH_CANDIDATES, searchCandidatesSaga);
  yield takeEvery(GET_DETAIL_RESUME_CANDIDATE, getDetailResumeCandidateSaga);
  yield takeEvery(SAVE_CANDIDATE, saveCandidateSaga);
  yield takeEvery(GET_SAVED_CANDIDATES, getSavedCandidatesSaga);
  yield takeEvery(DELETE_SAVED_CANDIDATE, deleteSavedCandidateSaga);
  yield takeEvery(EMPLOYER_SEND_MAIL, sendMailSaga);
  yield takeEvery(EMPLOYER_GET_SENT_MAIL_LIST, employerGetSentMailListSaga);
}

export default candidatesSaga;
