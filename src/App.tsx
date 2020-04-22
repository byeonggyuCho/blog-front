import React,{ useEffect} from 'react';
import { Route }  from 'react-router-dom';
import { ListPage, PostPage, EditorPage, NotFoundPage } from './pages';
import Base from './containers/Base/Base';
import { useDispatch} from 'react-redux'
import * as userActions from 'actions/user'



const App:React.FC = () =>{

    const dispatch = useDispatch();

    const initializeUserInfo = () => {
        const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

         dispatch(userActions.setLoggedInfo(loggedInfo));
        try {
            dispatch(userActions.checkStatus());
        } catch (e) {
            storage.remove('loggedInfo');
            window.location.href = '/auth/login?expired';
        }
    }

    useEffect(()=>{
        initializeUserInfo()
    },[])

    return (
        <>
            <Route path="/" exact component={ListPage}/>
            <Route path="/page/:page" component={ListPage}/>
            <Route path="/tag/:tag/:page?" component={ListPage}/>
            <Route path="/post/:id" component={PostPage}/>
            <Route path="/editor" component={EditorPage}/>
            <Route component={NotFoundPage}/>
            <Base/>
        </>  
    );
};

export default App;