import {createAction, handleAction} from 'redux-actions';

import {map} from 'immutable';
import {pender} from 'redux-pender'


const initialSate = Map({});

export default handleAction({},initialSate);