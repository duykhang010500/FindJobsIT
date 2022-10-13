import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import candidatesSaga from './candidates/saga';
import jobsSaga from './jobs/saga';
import servicesSaga from './services/saga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(jobsSaga),
    fork(candidatesSaga),
    fork(servicesSaga),
  ]);
}

export default rootSaga;
