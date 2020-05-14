import {createAsyncAction} from 'typesafe-actions'
import {User, LoginInfo} from '../models'
import { createAction } from 'typesafe-actions';

export const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const;

// changeField, initializeForm,
export const REGISTER = {
  REQEUST:  'auth/REGISTER_REQUEST', 
  SUCCESS:  'auth/REGISTER_SUCCESS', 
  FAILURE:  'auth/REGISTER_FAILURE', 
} as const;


export const LOGIN = {
  REQEUST:  'auth/LOGIN_REQUEST', 
  SUCCESS:  'auth/LOGIN_SUCCESS', 
  FAILURE:  'auth/LOGIN_FAILURE', 
} as const;



export  const TEMP_SET_USER = 'auth/TEMP_SET_USER' as const; // 새로고침 이후 임시 로그인 처리

export const CHECK = {
  REQUEST:"auth/CHECK_REQUEST",
  SUCCESS:"auth/CHECK_SUCCESS",
  FAILURE:"auth/CHECK_FAILURE",
} as const;


// export const LOGOUT = 'user/LOGOUT' as const;
export const LOGOUT = {
  REQUEST:'auth/LOGOUT_REQUEST',
  SUCCESS:'auth/LOGOUT_SUCCESS',
  FAILURE:'auth/LOGOUT_FAILURE',
} as const;




export const changeField = createAction(CHANGE_FIELD,
  (form:{form:string,key:string,value:string})=> form  
)();

export const initializeForm = createAction(INITIALIZE_FORM,
  (type:string)=>type
)();



export const register = createAsyncAction(
  [REGISTER.REQEUST, (req:User)=>req ],
  [REGISTER.SUCCESS, (res:boolean)=>res ],
  [REGISTER.FAILURE, (err:Error)=>err ]
)()



export const login = createAsyncAction(
  [LOGIN.REQEUST, (req:LoginInfo)=>req ],
  [LOGIN.SUCCESS, (res:boolean)=>res ],
  [LOGIN.FAILURE, (err:Error)=>err ]
)()

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
  changeField,
  initializeForm,
  login,
  register,
  tempSetUser,
  check,
  logout
}

export default actions;