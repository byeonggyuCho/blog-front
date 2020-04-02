import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from 'reducers';
import rootSaga from 'sagas'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware as createRouterMiddleware} from "connected-react-router";
import { createBrowserHistory } from 'history'
/**
 *  리덕스 스토어 설정
 */


export const history = createBrowserHistory() 
const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);

// 개발 모드 일 때만 Redux Devtools를 적용합니다..
// const isDev = process.env.NODE_ENV === 'development';
// const devtools = isDev && window.__REDUX_DEVTOOLS_EXETENSION_COMPOSE__;
// const composeEnhancers = devtools || compose;


// preloadedState는 추후 서버사이드 랜더링을 했을 때 전달받는 초기 상태이다.
export default function configureStore (preloadedSate?)  {
    
    const store = createStore(
        // rootReducer, 
        createRootReducer(history), // root reducer with router state
        preloadedSate, 
        composeWithDevTools(
            applyMiddleware(
                sagaMiddleware,
                routerMiddleware
            )
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
}


 