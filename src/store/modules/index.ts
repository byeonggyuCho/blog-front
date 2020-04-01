import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading, {StateLoading} from './loading'
import post, {postSaga, StatePost} from './post'
import list, {listSaga, SateList} from './list'
import editor, {editorSaga, StateEditor} from './editor'
import base , {baseSaga , StateBase} from './base';

import { connectRouter } from 'connected-react-router';

const rootReducer = combineReducers({
    list, base, editor, post, loading
})

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),     // redux store에서 history객체를 이용하기 위해서...
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

// export default rootReducer;
export default createRootReducer;

export type RootState = ReturnType<typeof rootReducer>