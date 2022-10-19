import store from '.';
import { combineReducers } from 'redux';

import JobsReducer from './jobs/reducer';
import authReducer from './auth/reducer';
import servicesReducer from './services/reducer';
import locationReducer from './location/reducer';
import companiesReducer from './companies/reducer';
import candidatesReducer from './candidates/reducer';
import industriesReducer from './industries/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: JobsReducer,
  services: servicesReducer,
  location: locationReducer,
  companies: companiesReducer,
  candidates: candidatesReducer,
  industries: industriesReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
