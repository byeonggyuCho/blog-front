import * as api from 'lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga'
import {
    GET_POST,
    REMOVE_POST,
} from 'actions/post'


const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const removePostSaga = createRequestSaga(REMOVE_POST, api.removePost)

export const postSaga = function*(){
    yield takeLatest(GET_POST.REQUEST, getPostSaga)
    yield takeLatest(REMOVE_POST.REQUEST,removePostSaga)
}
