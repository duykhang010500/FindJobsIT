import { combineReducers } from 'redux';
import store from '.';

import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
