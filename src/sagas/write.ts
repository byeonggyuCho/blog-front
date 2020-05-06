import {createRequestSaga, createRequestSagaAndRedirection}  from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
  WRITE_POST,
  UPDATE_POST,
} from '../actions/write'
import { push } from 'connected-react-router';
import {put} from'redux-saga/effects'


// saga 생성
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost, function*({ _id, user }){

  yield put(push(`/@${user.profile.username}/${_id}`))
});
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost, function*({ _id, user }){

  yield put(push(`/@${user.profile.username}/${_id}`))
});



export function* writeSaga() {
  yield takeLatest(WRITE_POST.REQUEST, writePostSaga);
  yield takeLatest(UPDATE_POST.REQUEST, updatePostSaga);
}
