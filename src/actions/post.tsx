import {createAsyncAction,createAction} from 'typesafe-actions'
import {Post} from '../models';

export const READ_POST = {
  REQUEST: "post/READ_POST_REQUEST",
  SUCCESS: "post/READ_POST_SUCCESS",
  FAILURE: "post/READ_POST_FAILURE",
} as const


export const UNLOAD_POST = 'post/UNLOAD_POST' as const; // 포스트 페이지에서 벗어날 때 데이터 비우기


export const readPost = createAsyncAction(
  [READ_POST.REQUEST, (res:{id:string})=>res],
  [READ_POST.SUCCESS, (res:Post)=>res],
  [READ_POST.FAILURE, (err:Error)=>err]
)()
export const unloadPost = createAction(UNLOAD_POST)();


const actions = {
  readPost,
  unloadPost
}


export default actions;