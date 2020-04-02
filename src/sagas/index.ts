import { fork } from 'redux-saga/effects';
import {postSaga, } from 'sagas/post'
import  {editorSaga, } from 'sagas/editor'
import  {baseSaga , } from 'sagas/base';
import {listSaga} from 'sagas/list'


/**
 * fork를 쓰는 이유
 * 1. fork는 논 블로킹으로 동작하기 때문에 포크한 작업을 종료하지 않아도 rootSaga를 진행한다.
 *  - all effect는 블로킹이기 때문에 모든 서브 사가들이 완료되어야 실행한다.
 *  - fork effect는 논 브로킹이기 때문에 즉각적으로 실행된다.
 * 2. fork는 반환값을 이용해 테스크를 취소할 수 있다.
 * 3. 디버깅과 데이터 플로우의 정리에 도움이 된다.
 * 
 * 참고 : https://redux-saga.js.org/docs/advanced/RootSaga.html
 */


export default function* rootSaga() {

    yield console.log('[SYSTEM] rootSaga created')
    yield fork(baseSaga)
    yield fork(editorSaga)
    yield fork(postSaga)
    yield fork(listSaga)

    //     yield all([  
    //         baseSaga(),
    //         editorSaga(),
    //         postSaga()
    // ])
}