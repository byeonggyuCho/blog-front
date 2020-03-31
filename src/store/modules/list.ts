
import createRequestSaga from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
    ActionType,
    createReducer,
    createAsyncAction } from 'typesafe-actions'
import { Post} from 'store/models'


// const [
//     LIST_POSTS,
//     LIST_POSTS_SUCCESS,
//     LIST_POSTS_FAILURE,
//   ] = createRequestActionTypes('posts/LIST_POSTS');
const LIST = {
    REQUEST : 'LIST_POSTS_REQUEST',
    SUCCESS : 'LIST_POSTS_SUCCESS',
    FAILURE : 'LIST_POSTS_FAILURE'
} as const


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
    LIST.REQUEST,
    LIST.SUCCESS, 
    LIST.FAILURE, 
)<RequestPayload, any, Meta>();





const listPostsSaga = createRequestSaga(LIST, postsAPI.listposts)

export function* listSaga() {
    yield takeLatest(LIST.REQUEST, listPostsSaga);
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
        [LIST.SUCCESS]: (state, action) => ({
            ...state,
            posts: action.payload,
            // lastPage: parseInt(action.payload.headers['last-page'],10), // 숫자로 형변환₩
        }),
        [LIST.FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        })
    }
);

export default list;