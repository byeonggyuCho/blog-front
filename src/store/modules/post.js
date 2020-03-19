import {createAction, handleActions} from 'redux-actions';

import * as api from 'lib/api';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'lib/createRequestSaga'

// action type
const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';
const REMOVE_POST = 'post/REMOVE_POST';
const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

// actoin creator
export const getPost = createAction(GET_POST);
export const removePost = createAction(REMOVE_POST);

const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const removePostSaga = createRequestSaga(REMOVE_POST, api.removePost)

export const postSaga = function*(){
    yield takeLatest(GET_POST,getPostSaga)
    yield takeLatest(REMOVE_POST,removePostSaga)
}

// initial state
const initialSate = {
    post:'',
    tags:'',
    body:'',
    publishedDate:'',
};

// reducer
export default handleActions({

    [GET_POST_SUCCESS]: (state, { payload: data, meta: response }) => ({
        ...state,
        ...data,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    [REMOVE_POST_SUCCESS]: (state, { payload: data, meta: response }) => ({
        ...state,
        ...data,
    }),
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

},initialSate);