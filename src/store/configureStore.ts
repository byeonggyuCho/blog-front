import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import createRootReducer from '../reducers'
import logger from 'redux-logger';

import { routerMiddleware as routerMiddlewareCreater } from 'connected-react-router'
import { createBrowserHistory } from 'history'


export const history = createBrowserHistory()



const configureStore = function(history){

    const sagaMiddleware = createSagaMiddleware();
    const routerMiddleware = routerMiddlewareCreater(history);
    const rootReducer = createRootReducer(history)

    const store = createStore(
        rootReducer,
        // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
        composeWithDevTools(applyMiddleware(
            routerMiddleware,
            sagaMiddleware,
            logger
            )),
    );

    // 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.
    sagaMiddleware.run(rootSaga);

    return store
}

export default configureStore;