import {
    createAction,
    createAsyncAction
} from 'typesafe-actions'

import {Post} from 'models'


export const INITIALIZE = 'editor/INITALIZE';
export const CHANGE_INPUT = 'editor/CHANGE_INPUT';


// async Action Types
export const WRITE_POST = {
    REQUEST : 'editor/WRITE_POST_REQUEST',
    SUCCESS : 'editor/WRITE_POST_SUCCESS',
    FAILURE : 'editor/WRITE_POST_FAILURE'
} as const
export const GET_POST = {
    REQUEST : 'editor/GET_POST_REQUEST',
    SUCCESS : 'editor/GET_POST_SUCCESS',
    FAILURE : 'editor/GET_POST_FAILURE'
} as const
export const EDIT_POST = {
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

export default {
    initialize,
    changeInput,
    writePost,
    getPost,
    editPost
}