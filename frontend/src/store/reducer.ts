import store from '.';
import { combineReducers } from 'redux';

import cvReducer from './cv/reducer';
import JobsReducer from './jobs/reducer';
import authReducer from './auth/reducer';
import servicesReducer from './services/reducer';
import locationReducer from './location/reducer';
import companiesReducer from './companies/reducer';
import candidatesReducer from './candidates/reducer';
import industriesReducer from './industries/reducer';
import jobsSavedReducer from './jobsSaved/reducer';
import dashboardReducer from './dashboard/reducer';
import officesReducer from './offices/reducer';

const rootReducer = combineReducers({
  cv: cvReducer,
  auth: authReducer,
  jobs: JobsReducer,
  services: servicesReducer,
  location: locationReducer,
  companies: companiesReducer,
  candidates: candidatesReducer,
  industries: industriesReducer,
  jobsSaved: jobsSavedReducer,
  dashboard: dashboardReducer,
  offices: officesReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
