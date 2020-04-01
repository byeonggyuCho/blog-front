import * as api from 'lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga'
import {
    ActionType,
    createReducer,
    createAsyncAction
} from 'typesafe-actions'
import { Post} from 'store/models'


const GET_POST = {
    REQUEST :  'post/GET_POST_REQUEST',
    SUCCESS :  'post/GET_POST_SUCCESS',
    FAILURE :  'post/GET_POST_FAILURE'
} as const
const REMOVE_POST = {
    REQUEST :  'post/REMOVE_POST_REQUEST',
    SUCCESS :  'post/REMOVE_POST_SUCCESS',
    FAILURE :  'post/REMOVE_POST_FAILURE'
} as const




// actoin creator
export const getPost = createAsyncAction(
    GET_POST.REQUEST ,  
    GET_POST.SUCCESS , 
    GET_POST.FAILURE 
) <string, Post, Error>();

export const removePost = createAsyncAction(
    REMOVE_POST.REQUEST , 
    REMOVE_POST.SUCCESS ,
    REMOVE_POST.FAILURE 
) <string, any, Error>();

const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const removePostSaga = createRequestSaga(REMOVE_POST, api.removePost)

export const postSaga = function*(){
    yield takeLatest(GET_POST.REQUEST, getPostSaga)
    yield takeLatest(REMOVE_POST.REQUEST,removePostSaga)
}

export interface StatePost {
    post:string,
    tags:string[],
    body:string,
    publishedDate:string,
    title: string
};

// initial state
const initialSate : StatePost = {
    post:'',
    tags:[],
    body:'',
    publishedDate:'',
    title: ''
};

const actions = {getPost,removePost};
type PostAction = ActionType<typeof actions>;


// reducer
export default createReducer<StatePost, PostAction>(initialSate, {
    [GET_POST.SUCCESS]: (state, { payload}) => ({
        ...state,
        ...payload,
    }),
    [GET_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    [REMOVE_POST.SUCCESS]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [REMOVE_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

});