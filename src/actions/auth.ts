import {
    createAction,createAsyncAction
} from 'typesafe-actions'
import { any } from 'prop-types';

export const CHANGE_INPUT = 'auth/CHANGE_INPUT' as const; // input 값 변경
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const ; // form 초기화
export const SET_ERROR =  'auth/SET_ERROR'as const; // 오류 설정



export const CHECK_EMAIL_EXISTS = {
    REQUEST : 'auth/CHECK_USERNAME_EXISTS_REQUEST',
    SUCCESS: 'auth/CHECK_USERNAME_EXISTS_SUCCESS',
    FAILURE: 'auth/CHECK_USERNAME_EXISTS_FAILURE',
} as const

export const CHECK_USERNAME_EXISTS = {
    REQUEST: 'auth/CHECK_USERNAME_EXISTS_REQUEST',
    SUCCESS: 'auth/CHECK_USERNAME_EXISTS_SUCCESS',
    FAILURE: 'auth/CHECK_USERNAME_EXISTS_FAILURE',
} as const


export const LOGIN = {
    REQUEST: 'auth/LOGIN_REQUEST',
    SUCCESS: 'auth/LOGIN_SUCCESS',
    FAILURE: 'auth/LOGIN_FAILURE',
}

export const REGISTER = {
    REQUEST: 'auth/REGISTER_REQUEST',
    SUCCESS: 'auth/REGISTER_SUCCESS',
    FAILURE: 'auth/REGISTER_FAILURE',
}

export const LOGOUT = {
    REQUEST: 'auth/LOGOUT_REQUEST',
    SUCCESS: 'auth/LOGOUT_SUCCESS',
    FAILURE: 'auth/LOGOUT_FAILURE',
}


//auth/REGISTER'; // 이메일 가입
// const LOGIN = 'auth/LOGIN'; // 이메일 로그인
// const LOGOUT = 'auth/LOGOUT'; // 이메일 로그인





export const checkEmailExists =  createAsyncAction(
    CHECK_EMAIL_EXISTS.REQUEST,
    CHECK_EMAIL_EXISTS.SUCCESS,
    CHECK_EMAIL_EXISTS.FAILURE,
)<string, boolean, Error >();


export const checkUsernameExists =  createAsyncAction(
    CHECK_USERNAME_EXISTS.REQUEST,
    CHECK_USERNAME_EXISTS.SUCCESS,
    CHECK_USERNAME_EXISTS.FAILURE,
)<string, boolean, Error >();



type ErrorInfo = {
    form : string
    message : string
}


export const login = createAsyncAction( 
    LOGIN.REQUEST,
    LOGIN.SUCCESS,
    LOGIN.FAILURE
)<any, boolean, Error>()

export const logout = createAsyncAction(  
    LOGIN.REQUEST,
    LOGIN.SUCCESS,
    LOGIN.FAILURE
)<any, boolean, Error>()


export const register = createAsyncAction(
    REGISTER.REQUEST, 
    REGISTER.SUCCESS, 
    REGISTER.FAILURE, 
)<any, boolean, Error>()






export const setError = createAction(SET_ERROR,
    action => (error: ErrorInfo) => action(error)
);


export const changeInput = createAction(CHANGE_INPUT, 
    action => ({name, value, form } : {name:string, value:string, form: string}) => action({name, value, form } )    
)
export const initializeForm =  createAction(INITIALIZE_FORM,
    action => (type:string) => action(type)    
);



const actions = {
    changeInput,
    initializeForm,
    checkEmailExists,
    checkUsernameExists,
    setError
}

export default actions