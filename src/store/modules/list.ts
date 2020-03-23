
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
    _id: string,
    title: string,
    tags: string[],
    markdown: string,
    body: string,
    publishedDate: string
}


export const listPosts = createAsyncAction(
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
)<undefined, any,Error>();

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listposts)

export function* listSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

export interface stateList {
    posts: object[],
    error: object,
    lastPage: number,
}


export interface SateList {
    posts: Post[],
    error: object,
    lastPage: number,
}

const initialSate: SateList = {
    posts: [],
    error: null,
    lastPage: 1,
};

const actions = {listPosts};
type ListAction = ActionType<typeof actions>;

// reducer
const list = createReducer<SateList,ListAction >(initialSate, {
        [LIST_POSTS_SUCCESS]: (state, { payload}) => ({
            ...state,
            posts: payload.data,
            lastPage: parseInt(payload.headers['last-page'],10), // 숫자로 형변환₩
        }),
        [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        })
    }
);

export default list;