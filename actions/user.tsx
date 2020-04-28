import { createAsyncAction,createAction } from 'typesafe-actions';
import {LoginInfo, User} from '../models';

export  const TEMP_SET_USER = 'user/TEMP_SET_USER' as const; // 새로고침 이후 임시 로그인 처리

export const CHECK = {
  REQUEST:"user/CHECK_REQUEST",
  SUCCESS:"user/CHECK_SUCCESS",
  FAILURE:"user/CHECK_FAILURE",
} as const;


export const LOGOUT = 'user/LOGOUT' as const;

// 회원 정보 확인
export const check = createAsyncAction(
  [CHECK.REQUEST, (req:LoginInfo)=> req], 
  [CHECK.SUCCESS, (res:User)=>res],
  [CHECK.FAILURE, (err:Error )=>err],
)()

  


export const tempSetUser = createAction(TEMP_SET_USER, user => user)();
export const logout = createAction(LOGOUT, 
  (id: string)=>id 
)();

const actions = {
  tempSetUser,
  check,
  logout
}


export default actions;