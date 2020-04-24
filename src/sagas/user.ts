import * as api from 'lib/api/auth';
import { takeLatest,put,call } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga'
import { startLoading, finishLoading } from 'actions/loading';
import { push } from 'connected-react-router';
import storage from 'lib/storage'

import {
    LOGOUT,
    CHECK_STATUS,
} from 'actions/user'


const logoutSaga = function*(action:PayloadAction<AsyncActionTypes<string,string,string>,any>){

    yield put(startLoading(LOGOUT.REQUEST))
//api: PromiseCreatorFunction<Param, RES>
    try{
        const response = yield call(api.logout, action.payload);

        yield put ({
            type: LOGOUT.REQUEST,
            payload : response.data
        })


        storage.remove('loggedInfo');
        push('/')// 홈페이지로 새로고침
        // window.location.href = '/'; // 홈페이지로 새로고침
    }catch(e){
        yield put({
            type: LOGOUT.FAILURE,
            payload: e,
            error: true,
        })
    }finally{
        yield put(finishLoading(LOGOUT.REQUEST))
    }

}


// const logoutSaga = createRequestSaga(LOGOUT, api.logout)
const checkStatusSaga = createRequestSaga(CHECK_STATUS, api.checkStatus)

export function* baseSaga(){
    yield takeLatest(LOGOUT.REQUEST, logoutSaga);
    yield takeLatest(CHECK_STATUS.REQUEST, checkStatusSaga);
}