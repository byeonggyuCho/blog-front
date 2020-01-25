import {createAction, handleAction} from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender'
import * as api from '../../lib/api';

// action type
const GET_POST = 'post/GET_POST';

// actoin creator
export const getPost = createAction(GET_POST, api.getPost);

// initial state
const initialSate = Map({
    post: Map({})
});

// reducer
export default handleAction({
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { date: post } = action.payload;
            return state.set('post', fromJS(post))
        }

    })
},initialSate);