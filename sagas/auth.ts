import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import {
  REGISTER,
  LOGIN,
} from '../actions/auth'



// saga 생성
const registerSaga = createRequestSaga(REGISTER.REQEUST, authAPI.register);
const loginSaga = createRequestSaga(LOGIN.REQEUST, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER.REQEUST, registerSaga);
  yield takeLatest(LOGIN.REQEUST, loginSaga);
}
