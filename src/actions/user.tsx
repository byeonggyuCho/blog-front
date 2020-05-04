import { createAsyncAction,createAction } from 'typesafe-actions';
import { User} from '../models';

export  const TEMP_SET_USER = 'user/TEMP_SET_USER' as const; // 새로고침 이후 임시 로그인 처리

export const CHECK = {
  REQUEST:"user/CHECK_REQUEST",
  SUCCESS:"user/CHECK_SUCCESS",
  FAILURE:"user/CHECK_FAILURE",
} as const;


// export const LOGOUT = 'user/LOGOUT' as const;
export const LOGOUT = {
  REQUEST:'user/LOGOUT_REQUEST',
  SUCCESS:'user/LOGOUT_SUCCESS',
  FAILURE:'user/LOGOUT_FAILURE',
} as const;

// 회원 정보 확인
export const check = createAsyncAction(
  [CHECK.REQUEST, ()=>{}], 
  [CHECK.SUCCESS, (res:User)=>res],
  [CHECK.FAILURE, (err:Error )=>err],
)()

  


export const tempSetUser = createAction(TEMP_SET_USER, user => user)();
// export const logout = createAction(LOGOUT)();
export const logout = createAsyncAction(
  [LOGOUT.REQUEST, ()=>{}],
  [LOGOUT.SUCCESS, ()=>{}],
  [LOGOUT.FAILURE, (errorMsg:string)=>errorMsg],
)();

const actions = {
  tempSetUser,
  check,
  logout
}


export default actions;