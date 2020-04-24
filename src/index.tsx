import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from 'store/configure';
import Root from './Root';

// // 리덕스 스토어 설정
const store = configureStore();
const container = document.getElementById('root');

ReactDOM.render(
    <Root store= {store} history={history}/>
    ,container
);

serviceWorker.unregister();
