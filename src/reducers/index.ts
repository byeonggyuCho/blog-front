import { combineReducers } from 'redux';
import { History } from 'history'
import loading, {StateLoading} from './loading'
import post, { StatePost} from './post'
import list, { SateList} from './list'
import editor, {StateEditor} from './editor'
import base , { StateBase} from './base';

import { connectRouter } from 'connected-react-router';




export interface RootState {
    base : StateBase,
    editor: StateEditor,
    list : SateList,
    loading : StateLoading
    post : StatePost,
}



const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),     // redux store에서 history객체를 이용하기 위해서...
    base, 
    editor, 
    list, 
    loading,
    post, 
})

export default createRootReducer;
