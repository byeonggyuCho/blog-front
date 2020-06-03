import { takeLatest } from 'redux-saga/effects';
import {createRequestSaga} from '../lib/createRequestSaga';
import storage from '../lib/storage'
import {push,} from 'connected-react-router'
import {put} from'redux-saga/effects'

import * as authAPI from '../lib/api/auth';
import {
  REGISTER,
  LOGIN,
  CHECK,
  LOGOUT
} from '../actions/auth'




function checkFailureSaga() {
  try {
    storage.remove('user')
  } catch (e) {
    console.log('localStorage is not working');
  }
}


const checkSaga = createRequestSaga(CHECK, authAPI.check);



const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout, ()=>{
  storage.remove('user')
})

// storage.set('user', JSON.stringify(user));
// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
// const loginSaga = createRequestSagaAndRedirection(LOGIN, authAPI.login,'/');
const loginSaga = createRequestSaga(LOGIN, authAPI.login, function*(user){

  storage.set('user', JSON.stringify(user));
  yield put(push('/'))

});
export function* authSaga() {
  yield takeLatest(REGISTER.REQEUST, registerSaga);
  yield takeLatest(LOGIN.REQEUST, loginSaga);
  yield takeLatest(CHECK.REQUEST, checkSaga);
  yield takeLatest(CHECK.FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT.REQUEST, logoutSaga);
}
