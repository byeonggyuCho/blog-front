import {
    ActionType,
    createReducer,
    createAction,
    createAsyncAction} from 'typesafe-actions'

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';
import {Post } from 'store/models'

// action type
const INITIALIZE = 'editor/INITALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';
const WRITE_POST_SUCCESS = 'editor/WRITE_POST_SUCCESS';
const WRITE_POST_FAILURE = 'editor/WRITE_POST_FAILURE';
const GET_POST = 'editor/GET_POST';
const GET_POST_SUCCESS = 'editor/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'editor/GET_POST_FAILURE';
const EDIT_POST = 'editor/EDIT_POST';
const EDIT_POST_SUCCESS = 'editor/EDIT_POST_SUCCESS';
const EDIT_POST_FAILURE = 'editor/EDIT_POST_FAILURE' ;




interface WritePost {
    title: string,
    body: string,
    tags: string[]
}

interface EditPost {
    id: string,
    title: string,
    body: string,
    tags: string[]
}

export const initialize =  createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT, 
    action => (payload : {name:string, value:string}) => action(payload)   
);
export const writePost =  createAsyncAction(
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE
)<WritePost, Post, Error >();

export const getPost =  createAsyncAction(
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
)<string, Post, Error >();

export const editPost= createAsyncAction(
    EDIT_POST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE
)<EditPost, Post, Error >();


const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const editPostSaga = createRequestSaga(EDIT_POST, api.editPost)
const writePostSaga = createRequestSaga(WRITE_POST, api.writePost)


export function* editorSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(EDIT_POST, editPostSaga);
    yield takeLatest(WRITE_POST, writePostSaga);
}


export interface StateEditor{
    title: string,
    tags:string,
    markdown: string,
    postId: string,
    id: string,
    [propName: string]: any
}

// initial state
const initialSate : StateEditor = {
    title: '',
    tags:'',
    markdown: '',
    postId: '',
    id: '',
};


const actions = { initialize, changeInput, writePost, getPost, editPost};
type EditorAction = ActionType<typeof actions>


// reducer
export default createReducer<StateEditor,EditorAction>(initialSate,{
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, actoin) => ({
        ...state,   
        [actoin.payload.name] : actoin.payload.value
    }),
    [WRITE_POST_SUCCESS]: (state, action) => ({
        ...state,
        payload: action.payload,
        id: action.payload._id
    }),
  
    [WRITE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [GET_POST_SUCCESS]: (state, { payload }) => ({
        ...state,
        payload: payload,
        title: payload.title,
        markdown: payload.markdown,
        tags: payload.tags.join(', ')
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [EDIT_POST_SUCCESS]: (state, { payload }) => ({
        ...state,
        payload: payload,
        title: payload.title,
        markdown: payload.markdown,
        tags: payload.tags.join(', ')
    }),
    [EDIT_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    

});