import {
    createAction,createAsyncAction
} from 'typesafe-actions'

export const CHANGE_INPUT = 'auth/CHANGE_INPUT' as const; // input 값 변경
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const ; // form 초기화


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





export const checkEmailExists =  createAsyncAction(
    CHECK_EMAIL_EXISTS.REQUEST,
    CHECK_EMAIL_EXISTS.SUCCESS,
    CHECK_EMAIL_EXISTS.FAILURE,
)<string, boolean, Error >();


export const checkUserNmaeExists =  createAsyncAction(
    CHECK_USERNAME_EXISTS.REQUEST,
    CHECK_USERNAME_EXISTS.SUCCESS,
    CHECK_USERNAME_EXISTS.FAILURE,
)<string, boolean, Error >();



export const changeInput = createAction(CHANGE_INPUT)
export const initializeForm =  createAction(INITIALIZE_FORM);



const actions = {
    changeInput,
    initializeForm,
    checkEmailExists,
    checkUserNmaeExists,
}

export default actions