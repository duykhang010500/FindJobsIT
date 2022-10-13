import { toast } from 'react-toastify';
import { LOGIN_ADMIN, LOGIN_EMPLOYER, REGISTER_EMPLOYER } from './actionTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import employerServices from '../../services/employer';
import {
  loginAdminSuccess,
  loginEmployerFailure,
  loginEmployerSuccess,
  registerEmployerFailure,
  registerEmployerSuccess,
} from './action';
import adminServices from '../../services/admin';

function* employerRegister({ payload: { formData, navigate } }: any): any {
  try {
    const res = yield call(employerServices.register, formData);
    if (res.status === 200) {
      yield put(registerEmployerSuccess());
      toast.success('Register successfully!');
      navigate('/employer/login');
    }
  } catch (err) {
    console.log(err);
    yield put(registerEmployerFailure(err));
  }
}

function* employerLogin({ payload: { formData, navigate } }: any): any {
  try {
    const response = yield call(employerServices.login, formData);
    toast.success('Login successfully!');
    localStorage.setItem('accessToken', response.data.access_token);
    yield put(loginEmployerSuccess(response.data.access_token));
    navigate('/employer/hr/dashboard');

    console.log('Response: ', response);
  } catch (err) {
    yield put(loginEmployerFailure(err));
  }
}

function* adminLogin({ payload: { formData, navigate } }: any): any {
  try {
    const response = yield call(adminServices.login, formData);
    console.log(response);
    yield put(loginAdminSuccess());
    if (response.status === 200) {
      navigate('/admin/dashboard');
    }
  } catch (err) {
    if (err) {
      console.log('Error!');
    }
    // console.log('Admin login err: ', err);
  }
}

function* authSaga() {
  yield takeEvery(REGISTER_EMPLOYER, employerRegister);
  yield takeEvery(LOGIN_EMPLOYER, employerLogin);
  yield takeEvery(LOGIN_ADMIN, adminLogin);
}

export default authSaga;
