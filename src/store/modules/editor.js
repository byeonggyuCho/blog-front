import {createAction, handleAction} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as api from '../../lib/api';

// action type
const INITIALIZE = 'editor/INITALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST);


// initial state
const initialSate = Map({
    title: '',
    markdown: '',
    tags:'',
    postid: null
});

// reducer
export default handleAction({
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, action) => {
        const {name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    })
},initialSate);