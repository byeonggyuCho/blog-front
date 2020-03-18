
/**
 *  리덕스 스토어 설정
 * 
 */
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from 'store/modules';
import { composeWithDevTools } from 'redux-devtools-extension';


// const reducers = combineReducers(modules);

const sagaMiddleware = createSagaMiddleware();
const pendderMiddleware = penderMiddleware()
const middlewares = [ pendderMiddleware, sagaMiddleware ];


// 개발 모드 일 때만 Redux Devtools를 적용합니다..
// const isDev = process.env.NODE_ENV === 'development';
// const devtools = isDev && window.__REDUX_DEVTOOLS_EXETENSION_COMPOSE__;
// const composeEnhancers = devtools || compose;



// preloadedState는 추후 서버사이드 랜더링을 했을 때 전달받는 초기 상태이다.
const configure = (preloadedSate)  => {
    
    const store = createStore(
        rootReducer, 
        preloadedSate, 
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    return store;
}


export default configure;