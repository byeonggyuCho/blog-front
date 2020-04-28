import {createAsyncAction} from 'typesafe-actions'
import {User, LoginInfo} from '../models'
import { createAction } from 'typesafe-actions';
import { string } from 'prop-types';

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


// form: 'login',
// key: name,
// value,

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


const actions = {
  login,
  changeField,
  initializeForm,
  register
}

export default actions;