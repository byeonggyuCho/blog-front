import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from 'store/configure';

// // 리덕스 스토어 설정
const store = configureStore();
const container = document.getElementById('root');

/**
 * BrowserRouter : HTML5 히스토리 API를 사용하여 주소를 관리하는 라우터
 * Roote: 요청 경로와 렌더링할 컴포넌트를 설정
 * Switch: 하위 라우터중 하나를 선택한다.
 * Redirect : 요청 경로를다른 경로로 리다이렉션한다.
 */

ReactDOM.render(
    <Provider store={store}>
         <ConnectedRouter history={history}> 
            <App/>
        </ConnectedRouter>
    </Provider>
    , container
);

serviceWorker.unregister();
