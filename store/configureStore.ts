import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import initState from '../reducers'




const configureStore = function(){

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        initState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );


    sagaMiddleware.run(rootSaga);

    return store
}

export default configureStore;