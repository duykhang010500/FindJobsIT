import { all, fork } from 'redux-saga/effects';

import authSaga from './auth/saga';
import jobsSaga from './jobs/saga';
import locationSaga from './location/saga';
import servicesSaga from './services/saga';
import companiesSaga from './companies/saga';
import candidatesSaga from './candidates/saga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(jobsSaga),
    fork(candidatesSaga),
    fork(servicesSaga),
    fork(companiesSaga),
    fork(locationSaga),
  ]);
}

export default rootSaga;
