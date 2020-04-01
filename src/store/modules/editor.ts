import {
    ActionType,
    createReducer,
    createAction,
    createAsyncAction
} from 'typesafe-actions'

import * as api from 'lib/api/posts';
import createRequestSaga from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';
import {Post } from 'store/models'

// action type
const INITIALIZE = 'editor/INITALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';


// async Action Types
const WRITE_POST = {
    REQUEST : 'editor/WRITE_POST_REQUEST',
    SUCCESS : 'editor/WRITE_POST_SUCCESS',
    FAILURE : 'editor/WRITE_POST_FAILURE'
} as const
const GET_POST = {
    REQUEST : 'editor/GET_POST_REQUEST',
    SUCCESS : 'editor/GET_POST_SUCCESS',
    FAILURE : 'editor/GET_POST_FAILURE'
} as const
const EDIT_POST = {
    REQUEST : 'editor/EDIT_POST_REQUEST',
    SUCCESS : 'editor/EDIT_POST_SUCCESS',
    FAILURE : 'editor/EDIT_POST_FAILURE'
} as const



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
    WRITE_POST.REQUEST,
    WRITE_POST.SUCCESS,
    WRITE_POST.FAILURE,
)<WritePost, Post, Error >();

export const getPost =  createAsyncAction(
    GET_POST.REQUEST,
    GET_POST.SUCCESS,
    GET_POST.FAILURE,
)<string, Post, Error >();

export const editPost= createAsyncAction(
    EDIT_POST.REQUEST,
    EDIT_POST.SUCCESS,
    EDIT_POST.FAILURE,
)<EditPost, Post, Error >();


const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const editPostSaga = createRequestSaga(EDIT_POST, api.editPost)
const writePostSaga = createRequestSaga(WRITE_POST, api.writePost)


export function* editorSaga() {
    yield takeLatest(GET_POST.REQUEST, getPostSaga);
    yield takeLatest(EDIT_POST.REQUEST, editPostSaga);
    yield takeLatest(WRITE_POST.REQUEST, writePostSaga);
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
    [CHANGE_INPUT]: (state, actoin) => {

        let re = { 
            ...state,   
         [actoin.payload.name] : actoin.payload.value
         }
        //  console.log('====',re)
       return re
    },
    [WRITE_POST.REQUEST]: (state, action)=>({
        ...state
    }),
    [WRITE_POST.SUCCESS]: (state, action) => ({
        ...state,
        //payload: action.payload,
        postId: action.payload._id
    }),
  
    [WRITE_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [GET_POST.SUCCESS]: (state, { payload }) => ({
        ...state,
        payload: payload,
        title: payload.title,
        markdown: payload.markdown,
        tags: payload.tags.join(', ')
    }),
    [GET_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [EDIT_POST.SUCCESS]: (state, { payload }) => ({
        ...state,
        payload: payload,
        title: payload.title,
        markdown: payload.markdown,
        tags: payload.tags.join(', ')
    }),
    [EDIT_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    

});