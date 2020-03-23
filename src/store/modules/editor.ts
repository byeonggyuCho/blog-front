import {
    ActionType,
    createReducer,
    createAction,
    createAsyncAction} from 'typesafe-actions'

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';


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


interface Post {
    _id: string,
    title: string,
    tags: string[],
    markdown: string
}


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
export const initialize =  createAction(INITIALIZE)();
export const changeInput = createAction(CHANGE_INPUT)<{name:string, value: string}>();
export const writePost =  createAsyncAction(
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE
)<WritePost, {_id:string}, Error >();
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

const actions = { initialize, changeInput, writePost, getPost, editPost};
type EditorAction = ActionType<typeof actions>


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

// interface stateAndPayload extends stateEditor{
//     payload: Paylaod
// }

// reducer
export default createReducer<StateEditor,EditorAction>(initialSate,{
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, { payload: data }) => ({
        ...state,   
        [data.name] : data.value
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: data }) => ({
        ...state,
        data,
        id: data._id
    }),
  
    [WRITE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [GET_POST_SUCCESS]: (state, { payload: data }) => ({
        ...state,
        data,
        title: data.title,
        markdown: data.markdown,
        tags: data.tags.join(', ')
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [EDIT_POST_SUCCESS]: (state, { payload: data }) => ({
        ...state,
        data,
        title: data.title,
        markdown: data.markdown,
        tags: data.tags.join(', ')
    }),
    [EDIT_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    

});