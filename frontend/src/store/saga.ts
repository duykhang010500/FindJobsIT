import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import jobsSaga from './jobs/saga';

function* rootSaga() {
  yield all([fork(authSaga), fork(jobsSaga)]);
}

export default rootSaga;
