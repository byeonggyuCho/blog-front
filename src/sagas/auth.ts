import { takeLatest } from 'redux-saga/effects';
import {createRequestSaga, createRequestSagaAndRedirection} from '../lib/createRequestSaga';


import * as authAPI from '../lib/api/auth';
import {
  REGISTER,
  LOGIN,
} from '../actions/auth'



// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSagaAndRedirection(LOGIN, authAPI.login,'/');
export function* authSaga() {
  yield takeLatest(REGISTER.REQEUST, registerSaga);
  yield takeLatest(LOGIN.REQEUST, loginSaga);
}
