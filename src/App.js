import React from 'react';
import { Route }  from 'react-router-dom';
import { ListPage, PostPage, EditorPage, NotFoundPage } from 'pages';
import Base from 'containers/common/Base';


const App = () =>{
    return (
        <>
            <Route path="/" exact component={ListPage}/>
            <Route path="/page/:page" component={ListPage}/>
            <Route path="/tag/:tag/:page?" component={ListPage}/>
            <Route path="/post/:id" component={PostPage}/>
            {/* <Route path="/editor" component={EditorPage}/> */}
            <Route component={NotFoundPage}/>
            <Base/>
        </>  
    );
};

export default App;