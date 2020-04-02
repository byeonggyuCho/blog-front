import * as api from 'lib/api/auth';
import createRequestSaga  from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';
import { 
    LOGIN, 
    LOGOUT, 
    CHECK_LOGIN, 
} from 'actions/base'


const loginSaga = createRequestSaga(LOGIN, api.login);
const logoutSaga = createRequestSaga(LOGOUT,api.logout);
const checkLoginSaga = createRequestSaga(CHECK_LOGIN,api.checkLogin);

export function* baseSaga(){
    yield takeLatest(LOGIN.REQUEST, loginSaga);
    yield takeLatest(LOGOUT.REQUEST, logoutSaga);
    yield takeLatest(CHECK_LOGIN.REQUEST, checkLoginSaga);
}

