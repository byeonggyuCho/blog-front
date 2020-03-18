// export { default as editor } from './editor'
// export { default as list } from './list'
// export { default as post } from './post'
// export { default as base } from './base'
// export { penderReducer as pender } from 'redux-pender'

import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading'
import post from './post'
import list, {listSaga} from './list'
import editor, {editorSaga} from './editor'
import base  from './base';

const rootReducer = combineReducers({
    list, base, editor
})

export function* rootSaga() {
    yield all([listSaga(), editorSaga()])
}

export default rootReducer;