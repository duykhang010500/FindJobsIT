import store from '.';
import { combineReducers } from 'redux';

import cvReducer from './cv/reducer';
import JobsReducer from './jobs/reducer';
import authReducer from './auth/reducer';
import officesReducer from './offices/reducer';
import foldersReducer from './folders/reducer';
import servicesReducer from './services/reducer';
import locationReducer from './location/reducer';
import companiesReducer from './companies/reducer';
import jobsSavedReducer from './jobsSaved/reducer';
import dashboardReducer from './dashboard/reducer';
import industriesReducer from './industries/reducer';
import candidatesReducer from './candidates/reducer';

const rootReducer = combineReducers({
  cv: cvReducer,
  auth: authReducer,
  jobs: JobsReducer,
  offices: officesReducer,
  folders: foldersReducer,
  services: servicesReducer,
  location: locationReducer,
  companies: companiesReducer,
  jobsSaved: jobsSavedReducer,
  dashboard: dashboardReducer,
  candidates: candidatesReducer,
  industries: industriesReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
