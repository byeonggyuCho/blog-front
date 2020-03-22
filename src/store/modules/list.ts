
// import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
    ActionType,
    createReducer,
    createAction,
    createAsyncAction } from 'typesafe-actions'


const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
  ] = createRequestActionTypes('posts/LIST_POSTS');
  

interface Post {
    title: string,
    
}

export const listPosts = createAsyncAction(
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
)<undefined,>

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listposts)

export function* listSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

export interface stateList {
    posts: object[],
    error: object,
    lastPage: number,
}

const initialSate: stateList = {
    posts: [],
    error: null,
    lastPage: 1,
};

// reducer
const list = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'],10), // 숫자로 형변환₩
        }),
        [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        })
    },
initialSate
);

export default list;