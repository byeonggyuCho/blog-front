import { combineReducers } from 'redux';
import auth,{StateAuth} from './auth';
import loading from './loading';
import user,{StateUser} from './user';
import write,{StateWrite}  from './write';
import post,{StatePost} from './post';
import posts,{StatePosts} from './posts';

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
