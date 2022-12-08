import { all, fork } from 'redux-saga/effects';

import cvSaga from './cv/saga';
import authSaga from './auth/saga';
import jobsSaga from './jobs/saga';
import locationSaga from './location/saga';
import servicesSaga from './services/saga';
import companiesSaga from './companies/saga';
import candidatesSaga from './candidates/saga';
import industriesSaga from './industries/saga';
import jobsSavedSaga from './jobsSaved/store';
import { dashboardSaga } from './dashboard/saga';
import officesSaga from './offices/saga';
import foldersSaga from './folders/saga';

function* rootSaga() {
  yield all([
    fork(cvSaga),
    fork(authSaga),
    fork(jobsSaga),
    fork(officesSaga),
    fork(foldersSaga),
    fork(locationSaga),
    fork(servicesSaga),
    fork(companiesSaga),
    fork(industriesSaga),
    fork(candidatesSaga),
    fork(jobsSavedSaga),
    fork(dashboardSaga),
  ]);
}

export default rootSaga;
