import * as api from 'lib/api/posts';
import createRequestSaga from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';
import {
    GET_POST,
    EDIT_POST,
    WRITE_POST
} from 'actions/editor'


const getPostSaga = createRequestSaga(GET_POST, api.getPost)

// 작성후 리다이렉션 경로를 지정한다.
const editPostSaga = createRequestSaga(EDIT_POST, api.editPost, '/post/')
const writePostSaga = createRequestSaga(WRITE_POST, api.writePost, '/post/')


export function* editorSaga() {
    yield takeLatest(GET_POST.REQUEST, getPostSaga);
    yield takeLatest(EDIT_POST.REQUEST, editPostSaga);
    yield takeLatest(WRITE_POST.REQUEST, writePostSaga);
}
