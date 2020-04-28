import createRequestSaga  from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
  WRITE_POST,
  UPDATE_POST,
} from '../actions/write'


// saga 생성
const writePostSaga = createRequestSaga(WRITE_POST.REQUEST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST.REQUEST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST.REQUEST, writePostSaga);
  yield takeLatest(UPDATE_POST.REQUEST, updatePostSaga);
}
