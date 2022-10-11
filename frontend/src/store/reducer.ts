import { combineReducers } from 'redux';
import store from '.';

import authReducer from './auth/reducer';
import JobsReducer from './jobs/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: JobsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
