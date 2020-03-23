import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading, {StateLoading} from './loading'
import post, {postSaga, StatePost} from './post'
import list, {listSaga, SateList} from './list'
import editor, {editorSaga, StateEditor} from './editor'
import base , {baseSaga , StateBase} from './base';

const rootReducer = combineReducers({
    list, base, editor, post, loading
})

export interface ReduxState {
    editor: StateEditor,
    list : SateList,
    base : StateBase,
    post : StatePost,
    loading : StateLoading
}

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