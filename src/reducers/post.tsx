import {createReducer, ActionType} from 'typesafe-actions'
import actions, {READ_POST,UNLOAD_POST} from '../actions/post'
import {Post} from '../models'


export interface StatePost {
  post: Post
  error: Error
}

const initialState:StatePost = {
  post: null,
  error: null,
};

type Actions = ActionType<typeof actions>

const post = createReducer<StatePost,Actions>(initialState,
  {
    [READ_POST.SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST.FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  
);

export default post;
