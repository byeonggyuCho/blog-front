import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
// import user from './user';
import write  from './write';
import post from './post';
import posts from './posts';
import { connectRouter } from 'connected-react-router'


// user reducers가 불필요해보인다.

const createRootReducer = (history)=>combineReducers({
  router: connectRouter(history),
  auth,
  loading,
  // user,
  write,
  post,
  posts,
});


export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;


export default createRootReducer;
