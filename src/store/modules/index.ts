import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading'
import post, {postSaga} from './post'
import list, {listSaga} from './list'
import editor, {editorSaga} from './editor'
import base , {baseSaga} from './base';

const rootReducer = combineReducers({
    list, base, editor, post, loading
})

export function* rootSaga() {
    yield all([
        baseSaga(),
        listSaga(), 
        editorSaga(),
        postSaga()
    ])
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>