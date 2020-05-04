import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import {
  CHECK,
  LOGOUT
}from '../actions/user'

import {createRequestSaga} from '../lib/createRequestSaga';

function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
}


const checkSaga = createRequestSaga(CHECK, authAPI.check);


function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK.REQUEST, checkSaga);
  yield takeLatest(CHECK.FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}