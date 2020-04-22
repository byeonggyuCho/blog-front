import * as api from 'lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga'

import {
    LOGOUT,
    CHECK_STATUS,
    SET_LOGGED_INFO
} from 'actions/user'



const logout = createRequestSaga(LOGOUT, api.logout)
const checkStatus = createRequestSaga(CHECK_STATUS, api.checkStatus)