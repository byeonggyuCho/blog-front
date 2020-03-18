import {createAction, handleActions} from 'redux-actions';

// import {Map} from 'immutable';
// import {pender} from 'redux-pender';
// import { write } from 'fs';
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
const EDIT_POST_FAILURE = 'editor/EDIT_POST_FAILURE';



// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST);
export const getPost = createAction(GET_POST);
export const editPost = createAction(EDIT_POST);

const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const editPostSaga = createRequestSaga(EDIT_POST, api.editPost)
const writePostSaga = createRequestSaga(WRITE_POST, api.writePost)


export function* editorSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(EDIT_POST, editPostSaga);
    yield takeLatest(WRITE_POST, writePostSaga);
}


// initial state
const initialSate = {
    title: '',
    tags:'',
    markdown: '',
    postId: ''
};

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, action) => {
        const {name, value } = action.payload;
       return {[name] : value}
    },

    [WRITE_POST_SUCCESS]: (state, { payload: data, meta: response }) => ({
        ...state,
        data,
        _id: data._id
    }),
    [WRITE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [GET_POST_SUCCESS]: (state, { payload: data, meta: response }) => ({
        ...state,
        data,
        title: data.titile,
        markdown: data.markdown,
        tags: data.tags.join(', ')
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [EDIT_POST_SUCCESS]: (state, { payload: data, meta: response }) => ({
        ...state,
        data,
        title: data.titile,
        markdown: data.markdown,
        tags: data.tags.join(', ')
    }),
    [EDIT_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    
    


   /*  ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    }), */
   /*  ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { title, tags, body } = action.payload.data;
            return state.set('title', title)
                        .set('markdown', body)
                        .set('tags', tags.join(', ')); // 배열: ,로 구분된 문자열
        }
    }) */
},initialSate);