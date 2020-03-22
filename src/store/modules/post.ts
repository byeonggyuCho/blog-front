import * as api from 'lib/api';
import {createAction, handleActions} from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from 'lib/createRequestSaga'

// action type
const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes(
    'post/GET_POST'
);

const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] = createRequestActionTypes(
    'post/REMOVE_POST'
);

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