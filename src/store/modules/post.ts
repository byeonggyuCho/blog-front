import * as api from 'lib/api';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from 'lib/createRequestSaga'
import {
    ActionType,
    createReducer,
    createAsyncAction
} from 'typesafe-actions'
import { Post, Responce} from 'store/models'

// action type
const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes(
    'post/GET_POST'
);

const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] = createRequestActionTypes(
    'post/REMOVE_POST'
);




// actoin creator
export const getPost = createAsyncAction(
    GET_POST,  
    GET_POST_SUCCESS, 
    GET_POST_FAILURE
) <string, Responce<Post>, Error>();

export const removePost = createAsyncAction(
    REMOVE_POST, 
    REMOVE_POST_SUCCESS, 
    REMOVE_POST_FAILURE
) <string, any, Error>();

const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const removePostSaga = createRequestSaga(REMOVE_POST, api.removePost)

export const postSaga = function*(){
    yield takeLatest(GET_POST,getPostSaga)
    yield takeLatest(REMOVE_POST,removePostSaga)
}

export interface StatePost {
    post:string,
    tags:string,
    body:string,
    publishedDate:string,
    title: string
};

// initial state
const initialSate : StatePost = {
    post:'',
    tags:'',
    body:'',
    publishedDate:'',
    title: ''
};

const actions = {getPost,removePost};
type PostAction = ActionType<typeof actions>;


// reducer
export default createReducer<StatePost, PostAction>(initialSate, {
    [GET_POST_SUCCESS]: (state, { payload}) => ({
        ...state,
        ...payload.data,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    [REMOVE_POST_SUCCESS]: (state, { payload }) => ({
        ...state,
        ...payload.data,
    }),
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

});