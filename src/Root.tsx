import React from 'react';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { tempSetUser, check } from './actions/user';
import { HelmetProvider } from 'react-helmet-async';
import configureStore,{history} from './store/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import storage from 'lib/storage'


const store = configureStore(history);

function loadUser() {
    try {
      const user = storage.get('user');
      console.log('loadUser', user)

      if (!user) return; // 로그인 상태가 아니라면 아무것도 안함
  
      store.dispatch(tempSetUser(user));
      store.dispatch(check.request());
    } catch (e) {
      console.log('localStorage is not working');
    }
}
  
loadUser();
  


const Root:React.FC = function(){

    return (
        <Provider store={store}>
            {/* <BrowserRouter> */}
            <ConnectedRouter history={history}>
              <HelmetProvider>
                  <App />
              </HelmetProvider>
            </ConnectedRouter>
            {/* </BrowserRouter> */}
        </Provider>
    )
}

export default Root;