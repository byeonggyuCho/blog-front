import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import user from './user';
import write  from './write';
import post from './post';
import posts from './posts';
import { connectRouter } from 'connected-react-router'


const createRootReducer = (history)=>combineReducers({
  router: connectRouter(history),
  auth,
  loading,
  user,
  write,
  post,
  posts,
});


export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;


export default createRootReducer;
