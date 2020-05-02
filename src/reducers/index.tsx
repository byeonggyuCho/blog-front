import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import user from './user';
import write  from './write';
import post from './post';
import posts from './posts';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
});


export type RootState = ReturnType<typeof rootReducer>;


export default rootReducer;
