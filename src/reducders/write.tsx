import {Post} from '../models'
import {createReducer, ActionType} from 'typesafe-actions'
import actions,{
  INITIALIZE,
  CHANGE_FIELD,
  WRITE_POST,
  SET_ORIGINAL_POST,
  UPDATE_POST
} from '../actions/write'

interface StateWrite {
  title: string,
  body: string,
  tags: string[],
  post: Post,
  postError: Error,
  originalPostId: String,
}

const initialState:StateWrite = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

type Actions = ActionType<typeof actions>


const write = createReducer<StateWrite,Actions>(initialState,
  {
    [INITIALIZE]: state => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post.id,
    }),
    
    [WRITE_POST.REQUEST]: (state,action) => ({
      ...state,
      // post와 postError를 초기화
      // post: null,
      // postError: null,
    }),
    // 포스트 작성 성공
    [WRITE_POST.SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_POST.FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  


    [UPDATE_POST.REQUEST]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST.SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST.FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
);

export default write;
