import {createAction, handleAction} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender'


// action type
const INITIALIZE = 'editor/INITALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);


// initial state
const initialSate = Map({
    title: '',
    markdown: '',
    tags:''
});

export default handleAction({
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, action) => {
        const {name, value } = action.payload;
        return state.set(name, value);
    }

},initialSate);