
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
    ActionType,
    createReducer,
    createAsyncAction } from 'typesafe-actions'
import { Post, Responce} from 'store/models'


const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
  ] = createRequestActionTypes('posts/LIST_POSTS');



interface ResponsePayload {
    payload: {
        data: number
    },
    posts : Post[],
    data:object,
    headers : object,
    // lastPage : number,
    error: object,
    [propName: string]: any
}

interface RequestPayload {
    tag:string, 
    username?:string, 
    page?: number
}

interface Meta {
    [propName: string]: any
}

export const listPosts = createAsyncAction(
    LIST_POSTS,
    LIST_POSTS_SUCCESS, 
    LIST_POSTS_FAILURE, 
)<RequestPayload, any, Meta>();





const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listposts)

export function* listSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
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
        [LIST_POSTS_SUCCESS]: (state, action) => ({
            ...state,
            posts: action.payload,
            // lastPage: parseInt(action.payload.headers['last-page'],10), // 숫자로 형변환₩
        }),
        [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        })
    }
);

export default list;