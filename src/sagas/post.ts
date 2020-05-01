import createRequestSaga  from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
  READ_POST
} from '../actions/post'


const readPostSaga = createRequestSaga(READ_POST.REQUEST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST.REQUEST, readPostSaga);
}

