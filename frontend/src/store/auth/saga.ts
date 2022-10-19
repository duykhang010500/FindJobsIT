import { toast } from 'react-toastify';
import { takeEvery, call, put } from 'redux-saga/effects';

import {
  LOGIN_ADMIN,
  LOGIN_EMPLOYER,
  LOGIN_JOBSEEKER,
  GET_INFO_EMPLOYER,
  REGISTER_EMPLOYER,
  REGISTER_JOBSEEKER,
} from './actionTypes';

import {
  getInfoEmployer,
  loginAdminSuccess,
  loginEmployerSuccess,
  loginEmployerFailure,
  jobSeekerLoginSuccess,
  getInfoEmployerSuccess,
  registerEmployerSuccess,
  registerEmployerFailure,
  jobSeekerRegisterSuccess,
  jobSeekerRegisterFailure,
} from './action';

import adminServices from '../../services/admin';
import employerServices from '../../services/employer';
import jobSeekerServices from '../../services/jobSeeker';

//job seeker
function* jobSeekerRegisterSaga({ payload: { formData, navigate } }: any): any {
  try {
    const res = yield call(jobSeekerServices.register, formData);
    console.log('res: ', res);
    if (res.status === 200) {
      yield put(jobSeekerRegisterSuccess());
      toast.success('Register successfully!');
      navigate('/login');
    }
  } catch (err) {
    yield put(jobSeekerRegisterFailure(err));
  }
}

function* jobSeekerLoginSaga({ payload: { formData, navigate } }: any): any {
  try {
    const res = yield call(jobSeekerServices.login, formData);
    if (res.status === 200) {
      yield put(jobSeekerLoginSuccess());
      const accessToken = res.data.token;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', '1');
      navigate('/');
    }
  } catch (err) {
    console.log(err);
    yield put(jobSeekerRegisterFailure(err));
  }
}

//employer
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
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('role', '2');
    yield put(loginEmployerSuccess(response.data.access_token));
    yield put(getInfoEmployer());
    navigate('/employer');
  } catch (err: any) {
    yield put(loginEmployerFailure(err.message));
  }
}

function* getCurrentEmployer(): any {
  try {
    const response = yield call(employerServices.getMyInfo);
    yield put(getInfoEmployerSuccess(response.data));
  } catch (err) {
    throw err;
  }
}

//admin
function* adminLogin({ payload: { formData, navigate } }: any): any {
  try {
    const response = yield call(adminServices.login, formData);
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('role', '0');
    yield put(loginAdminSuccess());
    if (response.status === 200) {
      navigate('/admin/dashboard');
    }
  } catch (err) {
    if (err) {
      console.log('Error: ', err);
    }
  }
}

function* authSaga() {
  yield takeEvery(REGISTER_JOBSEEKER, jobSeekerRegisterSaga);
  yield takeEvery(LOGIN_JOBSEEKER, jobSeekerLoginSaga);
  yield takeEvery(REGISTER_EMPLOYER, employerRegister);
  yield takeEvery(LOGIN_EMPLOYER, employerLogin);
  yield takeEvery(LOGIN_ADMIN, adminLogin);
  yield takeEvery(GET_INFO_EMPLOYER, getCurrentEmployer);
}

export default authSaga;
