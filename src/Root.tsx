import React from 'react';
import {  Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import {Store} from 'redux'

interface RootProp {
    store : Store
    history: any
}

const Root:React.FC<RootProp> = ({store, history}) => {
    return (

        <Provider store={store}>
            <ConnectedRouter history={history}> 
                <Route path="/" component={App}/>
            </ConnectedRouter>
        </Provider>
        // <BrowserRouter>
        //     <Route path="/" component={App}/>
        // </BrowserRouter>
    );
};

export default Root;