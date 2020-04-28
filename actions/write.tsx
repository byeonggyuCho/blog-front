import {createAsyncAction, createAction} from 'typesafe-actions'
import {Post} from '../models'
export const INITIALIZE = 'write/INITIALIZE' as const; // 모든 내용 초기화
export const CHANGE_FIELD = 'write/CHANGE_FIELD' as const; // 특정 key 값 바꾸기



export const WRITE_POST = {
  REQUEST:"write/WRITE_POST_REQUEST",
  SUCCESS:"write/WRITE_POST_SUCCESS",
  FAILURE:"write/WRITE_POST_FAILURE",
} as const 



export const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST' as const;


export const UPDATE_POST = {
  REQUEST: "write/UPDATE_POST_REQUEST",
  SUCCESS: "write/UPDATE_POST_SUCCESS",
  FAILURE: "write/UPDATE_POST_FAILURE",
} as const;
// 포스트 수정


export const initilize = createAction(INITIALIZE)();
export const chageField = createAction(CHANGE_FIELD,
  (form:{key:string, value: string})=> form  
)();


export const writePost =  createAsyncAction(
  [WRITE_POST.REQUEST, (post:Post)=>{

    let postError:Error;

    return {
      post,
      postError
    }
  }],
  [WRITE_POST.SUCCESS, (res:Post)=>res],
  [WRITE_POST.FAILURE, (err:Error)=>err],
); // 포스트 작성


export const setOriginalPost = createAction(SET_ORIGINAL_POST,
  (post:Post)=>post
)();

export const updatePost = createAsyncAction(
  [UPDATE_POST.REQUEST,(req: Post)=>req],
  [UPDATE_POST.SUCCESS,(res: boolean)=>res],
  [UPDATE_POST.FAILURE,(err:Error)=>err],
)

const actions = {
  initilize,
  chageField,
  setOriginalPost,
  writePost,
  updatePost
}

export default actions;
