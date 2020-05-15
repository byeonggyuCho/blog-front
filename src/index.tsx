import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
import Root from './Root'


ReactDOM.render(
  <Root/>,
  document.getElementById('root'),
);

serviceWorker.unregister();
