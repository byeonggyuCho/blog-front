import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading'
import post, {postSaga} from './post'
import list, {listSaga} from './list'
import editor, {editorSaga} from './editor'
import base  from './base';

const rootReducer = combineReducers({
    list, base, editor, post, loading
})

export function* rootSaga() {
    yield all([
        listSaga(), 
        editorSaga(),
        postSaga()
    ])
}

export default rootReducer;