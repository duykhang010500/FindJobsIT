import { all, fork } from 'redux-saga/effects';

import cvSaga from './cv/saga';
import authSaga from './auth/saga';
import jobsSaga from './jobs/saga';
import locationSaga from './location/saga';
import servicesSaga from './services/saga';
import companiesSaga from './companies/saga';
import candidatesSaga from './candidates/saga';
import industriesSaga from './industries/saga';

function* rootSaga() {
  yield all([
    fork(cvSaga),
    fork(authSaga),
    fork(jobsSaga),
    fork(locationSaga),
    fork(servicesSaga),
    fork(companiesSaga),
    fork(industriesSaga),
    fork(candidatesSaga),
  ]);
}

export default rootSaga;
