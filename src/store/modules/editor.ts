// import {
//     ActionType,
//     createReducer,
//     createAction,
//     createAsyncAction } from 'typesafe-actions'

import {createAction, createReducer} from 'lib/reduxUtil'
import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';


// action type
const INITIALIZE = 'editor/INITALIZE'as const;
const CHANGE_INPUT = 'editor/CHANGE_INPUT'as const;
const WRITE_POST = 'editor/WRITE_POST'as const;
const WRITE_POST_SUCCESS = 'editor/WRITE_POST_SUCCESS'as const;
const WRITE_POST_FAILURE = 'editor/WRITE_POST_FAILURE'as const;
const GET_POST = 'editor/GET_POST'as const;
const GET_POST_SUCCESS = 'editor/GET_POST_SUCCESS'as const;
const GET_POST_FAILURE = 'editor/GET_POST_FAILURE'as const;
const EDIT_POST = 'editor/EDIT_POST'as const;
const EDIT_POST_SUCCESS = 'editor/EDIT_POST_SUCCESS'as const;
const EDIT_POST_FAILURE = 'editor/EDIT_POST_FAILURE' as const;


// interface Post {
//     _id: string,
//     title: string,
//     tags: string[],
//     markdown: string
// }


interface RequestPost {
    title: string,
    body: string,
    tags: string
}

interface EditPost {
    id: string,
    title: string,
    body: string,
    tags: string
}

// action creators
export const initialize =  () => createAction(INITIALIZE);
export const changeInput = (param: {name:string, value: string}) => createAction(CHANGE_INPUT, param);
export const writePost =  (param: RequestPost) => createAction(WRITE_POST, param)
export const getPost =  (id: string) => createAction(GET_POST, id)
export const editPost=  (param: EditPost) => createAction( EDIT_POST, param)


export type EditorAction = 
   | ReturnType<typeof initialize>
   | ReturnType<typeof changeInput>
   | ReturnType<typeof writePost>
   | ReturnType<typeof getPost>
   | ReturnType<typeof editPost>

const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const editPostSaga = createRequestSaga(EDIT_POST, api.editPost)
const writePostSaga = createRequestSaga(WRITE_POST, api.writePost)


export function* editorSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(EDIT_POST, editPostSaga);
    yield takeLatest(WRITE_POST, writePostSaga);
}


export interface stateEditor{
    title: string,
    tags:string,
    markdown: string,
    postId: string,
    _id: string
    meta: object
}

// initial state
const initialSate : stateEditor = {
    title: '',
    tags:'',
    markdown: '',
    postId: '',
    _id: '',
    meta: null
};

// interface stateAndPayload extends stateEditor{
//     payload: Paylaod
// }

// reducer
export default createReducer<stateEditor,EditorAction>(initialSate,{
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, { payload: data }) => ({
        ...state,   
        [data.name] : data.value
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: data }) => ({
        ...state,
        data,
        _id: data._id
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