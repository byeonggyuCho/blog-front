import {createRequestSaga, createRequestSagaAndRedirection}  from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
  READ_POST,
  REMOVE_POST
} from '../actions/post'


const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
const removePostSaga = createRequestSagaAndRedirection(REMOVE_POST, postsAPI.removePost,'/');

export function* postSaga() {
  yield takeLatest(READ_POST.REQUEST, readPostSaga);
  yield takeLatest(REMOVE_POST.REQUEST, removePostSaga);
}