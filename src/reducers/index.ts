import { combineReducers } from 'redux';
import { History } from 'history'
import loading, {StateLoading} from './loading'
import post, { StatePost} from './post'
import list, { SatePostList} from './postList'
import editor, {StateEditor} from './editor'
import base , { StateBase} from './base';
import auth , {StateAuth} from './auth'
import user , {StateUser} from './user'
import { connectRouter } from 'connected-react-router';




export interface RootState {
    base : StateBase,
    editor: StateEditor,
    postList : SatePostList,
    loading : StateLoading
    post : StatePost,
    auth : StateAuth,
    user : StateUser,
}



const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),     // redux store에서 history객체를 이용하기 위해서...
    base, 
    editor, 
    list, 
    loading,
    post, 
    auth,
    user
})

export default createRootReducer;
