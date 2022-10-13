import { combineReducers } from 'redux';
import store from '.';

import authReducer from './auth/reducer';
import candidatesReducer from './candidates/reducer';
import JobsReducer from './jobs/reducer';
import servicesReducer from './services/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: JobsReducer,
  candidates: candidatesReducer,
  services: servicesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
