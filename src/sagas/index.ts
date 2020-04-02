import { all } from 'redux-saga/effects';
import {postSaga, } from './post'
import  {editorSaga, } from './editor'
import  {baseSaga , } from './base';


export default function* rootSaga() {

    yield console.log('[SYSTEM] rootSaga created')

    yield all([
        baseSaga(),
        editorSaga(),
        postSaga()
    ])
}