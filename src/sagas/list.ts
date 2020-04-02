import * as api from 'lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga'
import {
    LIST
} from 'actions/list'


const getListSaga = createRequestSaga(LIST, api.listposts)

export const listSaga = function*(){
    yield takeLatest(LIST.REQUEST, getListSaga)
}
