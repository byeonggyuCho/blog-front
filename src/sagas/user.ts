import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import {
  CHECK,
  LOGOUT
}from '../actions/user'
import storage from '../lib/storeage'

import {createRequestSaga} from '../lib/createRequestSaga';

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

export function* userSaga() {
  yield takeLatest(CHECK.REQUEST, checkSaga);
  yield takeLatest(CHECK.FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT.REQUEST, logoutSaga);
}