import * as api from 'lib/api/auth';
import createRequestSaga  from 'lib/createRequestSaga' 
import { takeLatest, put,call } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'actions/loading';
import { push } from 'connected-react-router';
import storage from 'lib/storage'
import * as UserActions from 'actions/user'


import { 
    CHECK_EMAIL_EXISTS, 
    CHECK_USERNAME_EXISTS, 
    LOGIN,
    REGISTER,
    SET_ERROR
} from 'actions/auth'


const checkEmailExistsSaga = createRequestSaga(CHECK_EMAIL_EXISTS, api.checkEmailExists);
const checkUsernameExistsSaga = createRequestSaga(CHECK_USERNAME_EXISTS,api.checkUsernameExists);
const loginSaga = function*(action: PayloadAction<AsyncActionTypes<string,string,string>,any>) {

    yield put(startLoading(LOGIN.REQUEST)); // 로딩 시작

    try{
        const response = yield call(api.login, action.payload);

        yield put({
            type: LOGIN.SUCCESS,
            payload: response.data
        });

        storage.set('loggedInfo',response.data )
        push('/')

    }catch(e){

        yield put({
            type: LOGIN.FAILURE,
            payload: e,
            error: true,
        });
    } finally {
        yield put(finishLoading(LOGIN.REQUEST)); // 로딩 끝
    }
}


const registerSaga = function*(action: PayloadAction<AsyncActionTypes<string,string,string>,any>) {

    yield put(startLoading(REGISTER.REQUEST)); // 로딩 시작

    try{
        const response = yield call(api.register, action.payload);
        const loggedInfo = response.data

        yield put({
            type: REGISTER.SUCCESS,
            payload: loggedInfo
        });

        storage.set('loggedInfo',loggedInfo )
        yield put ( UserActions.setLoggedInfo(loggedInfo));
        yield put ( UserActions.setValidated(true));
        push('/')

    }catch(e){

        yield put({
            type: REGISTER.FAILURE,
            payload: e,
            error: true,
        });
    } finally {
        yield put(finishLoading(REGISTER.REQUEST)); // 로딩 끝
    }

}


export function* baseSaga(){
    yield takeLatest(CHECK_EMAIL_EXISTS.REQUEST, checkEmailExistsSaga);
    yield takeLatest(CHECK_USERNAME_EXISTS.REQUEST, checkUsernameExistsSaga);
    yield takeLatest(REGISTER.REQUEST, registerSaga);
    yield takeLatest(LOGIN.REQUEST, loginSaga);
}

