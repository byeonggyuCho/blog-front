import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './Root'


ReactDOM.render(
  <Root/>,
  document.getElementById('root'),
);

serviceWorker.unregister();
