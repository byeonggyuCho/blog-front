import * as api from 'lib/api/auth';
import createRequestSaga  from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';

import { 
    CHECK_EMAIL_EXISTS, 
    CHECK_USERNAME_EXISTS, 
} from 'actions/auth'


const checkEmailExistsSaga = createRequestSaga(CHECK_EMAIL_EXISTS, api.checkEmailExists);
const checkUsernameExistsSaga = createRequestSaga(CHECK_USERNAME_EXISTS,api.checkUsernameExists);

export function* baseSaga(){
    yield takeLatest(CHECK_EMAIL_EXISTS.REQUEST, checkEmailExistsSaga);
    yield takeLatest(CHECK_USERNAME_EXISTS.REQUEST, checkUsernameExistsSaga);
}

