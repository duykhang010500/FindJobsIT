import { toast } from 'react-toastify';
import { REGISTER_EMPLOYER } from './actionTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import employerServices from '../../services/employer';
import { registerEmployerFailure, registerEmployerSuccess } from './action';

function* employerRegister({ payload: { formData, navigate } }: any): any {
  try {
    const res = yield call(employerServices.register, formData);
    console.log(res);
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

function* authSaga() {
  yield takeEvery(REGISTER_EMPLOYER, employerRegister);
}

export default authSaga;
