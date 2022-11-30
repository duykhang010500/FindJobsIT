import { toast } from 'react-toastify';
import { takeEvery, call, put } from 'redux-saga/effects';

import {
  LOGIN_ADMIN,
  LOGIN_EMPLOYER,
  LOGIN_JOBSEEKER,
  GET_INFO_EMPLOYER,
  REGISTER_EMPLOYER,
  REGISTER_JOBSEEKER,
  GET_INFO_ADMIN,
  UPDATE_INFO_EMPLOYER,
  GET_CURRENT_JOBSEEKER,
  EMPLOYER_FORGOT_PASSWORD,
  EMPLOYER_RESET_PASSWORD,
  JOBSEEKER_FORGOT_PASSWORD,
  JOBSEEKER_RESET_PASSWORD,
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
  getInfoAdminSuccess,
  getInfoAdmin,
  updateInfoEmployerSuccess,
  getCurrentJobSeeker,
  getCurrentJobSeekerSuccess,
  updateInfoEmployerFailure,
  employerForgotPasswordSuccess,
  employerResetPasswordSuccess,
  jobSeekerForgotPasswordSuccess,
  jobSeekerResetPasswordSuccess,
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
      toast.success('Please check email to verify account!');
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
      yield put(getCurrentJobSeeker());
    }
  } catch (err) {
    console.log(err);
    yield put(jobSeekerRegisterFailure(err));
  }
}

function* getCurrentJobSeekerSaga(): any {
  try {
    const res = yield call(jobSeekerServices.getCurrentJobSeeker);
    yield put(getCurrentJobSeekerSuccess(res.data.info[0]));
  } catch (err) {
    throw err;
  }
}

//employer
function* employerRegister({ payload: { formData, navigate } }: any): any {
  try {
    const res = yield call(employerServices.register, formData);
    if (res.status === 200) {
      yield put(registerEmployerSuccess());
      toast.success('Please check email to verify your account!');
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

function* updateInfoEmployerSaga({ payload: formData }: any): any {
  try {
    yield call(employerServices.updateProfile, formData);
    yield put(updateInfoEmployerSuccess());
    yield put(getInfoEmployer());
    toast.success('Update information successfully!');
  } catch (err) {
    yield put(updateInfoEmployerFailure(err));
  }
}

//admin
function* adminLogin({ payload: { formData, navigate } }: any): any {
  try {
    const response = yield call(adminServices.login, formData);
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('role', '0');
    yield put(loginAdminSuccess());
    yield put(getInfoAdmin());
    if (response.status === 200) {
      navigate('/admin/dashboard');
    }
  } catch (err) {
    if (err) {
      console.log('Error: ', err);
    }
  }
}

function* getInfoAdminSaga(): any {
  try {
    const res = yield call(adminServices.getCurrentInfo);
    yield put(getInfoAdminSuccess(res.data.info));
  } catch (err) {
    console.log('Err: ', err);
  }
}

function* employerForgotPasswordSaga({ payload }: any): any {
  try {
    const res = yield call(employerServices.forgotPassword, payload);
    yield put(employerForgotPasswordSuccess(res.data.message));
  } catch (err) {
    console.log(err);
  }
}

function* employerResetPasswordSaga({
  payload: { token, formData },
}: any): any {
  try {
    console.log(token, formData);
    const res = yield call(employerServices.resetPassword, token, formData);
    toast.success('Reset password successfully!');
    yield put(employerResetPasswordSuccess(res.data.message));
  } catch (err) {
    console.log(err);
  }
}

function* jobSeekerForgotPasswordSaga({ payload }: any): any {
  try {
    console.log('payload: ', payload);
    const res = yield call(jobSeekerServices.forgotPassword, payload);
    yield put(jobSeekerForgotPasswordSuccess(res.data.message));
  } catch (err) {
    console.log(err);
  }
}

function* jobSeekerResetPasswordSaga({
  payload: { token, formData },
}: any): any {
  try {
    console.log(token, formData);
    const res = yield call(jobSeekerServices.resetPassword, token, formData);
    toast.success('Reset password successfully!');
    yield put(jobSeekerResetPasswordSuccess(res.data.message));
  } catch (err) {
    console.log(err);
  }
}

function* authSaga() {
  yield takeEvery(REGISTER_JOBSEEKER, jobSeekerRegisterSaga);
  yield takeEvery(LOGIN_JOBSEEKER, jobSeekerLoginSaga);
  yield takeEvery(GET_CURRENT_JOBSEEKER, getCurrentJobSeekerSaga);
  yield takeEvery(REGISTER_EMPLOYER, employerRegister);
  yield takeEvery(LOGIN_EMPLOYER, employerLogin);
  yield takeEvery(GET_INFO_EMPLOYER, getCurrentEmployer);
  yield takeEvery(LOGIN_ADMIN, adminLogin);
  yield takeEvery(GET_INFO_ADMIN, getInfoAdminSaga);
  yield takeEvery(UPDATE_INFO_EMPLOYER, updateInfoEmployerSaga);
  yield takeEvery(EMPLOYER_FORGOT_PASSWORD, employerForgotPasswordSaga);
  yield takeEvery(EMPLOYER_RESET_PASSWORD, employerResetPasswordSaga);
  yield takeEvery(JOBSEEKER_FORGOT_PASSWORD, jobSeekerForgotPasswordSaga);
  yield takeEvery(JOBSEEKER_RESET_PASSWORD, jobSeekerResetPasswordSaga);
}

export default authSaga;
