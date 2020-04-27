import {createAsyncAction} from 'typesafe-actions'


export const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const;


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


interface User {

}

export const register = createAsyncAction(
  [REGISTER.REQEUST, (req:User)=>req ],
  [REGISTER.SUCCESS, (res:boolean)=>res ],
  [REGISTER.FAILURE, (err:Error)=>err ]
)()

interface loginInfo {
  id: string
  pw: string
}

export const login = createAsyncAction(
  [LOGIN.REQEUST, (req:loginInfo)=>req ],
  [LOGIN.SUCCESS, (res:boolean)=>res ],
  [LOGIN.FAILURE, (err:Error)=>err ]
)()


const actions = {
  login,
  register
}

export default actions;