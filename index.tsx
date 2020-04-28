import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './src/serviceWorker';
import Root from './Root'


ReactDOM.render(
  <Root/>,
  document.getElementById('root'),
);

serviceWorker.unregister();

serviceWorker.unregister();
