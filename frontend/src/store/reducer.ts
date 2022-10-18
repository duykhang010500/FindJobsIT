import store from '.';
import { combineReducers } from 'redux';

import JobsReducer from './jobs/reducer';
import authReducer from './auth/reducer';
import servicesReducer from './services/reducer';
import companiesReducer from './companies/reducer';
import candidatesReducer from './candidates/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: JobsReducer,
  services: servicesReducer,
  companies: companiesReducer,
  candidates: candidatesReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
