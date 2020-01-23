import {createAction, handleAction} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender'


const initialSate = Map({});

export default handleAction({},initialSate);