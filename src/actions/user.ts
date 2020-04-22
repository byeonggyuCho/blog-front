import {createAction , createAsyncAction} from 'typesafe-actions'




export const SET_VALIDATED = 'user/SET_VALIDATED'; // validated 값 설정



// // validated 값 설정
export const SET_LOGGED_INFO = {
    REQUEST: 'user/SET_VALIDATED_REQUEST',
    SUCCESS: 'user/SET_VALIDATED_SUCCESS',
    FAILURE: 'user/SET_VALIDATED_FAILURE',
} as const
//'user/SET_LOGGED_INFO'; // 로그인 정보 설정
export const LOGOUT = {
    REQUEST: 'user/LOGOUT_REQUEST',
    SUCCESS: 'user/LOGOUT_SUCCESS',
    FAILURE: 'user/LOGOUT_FAILURE',
} as const


 // 현재 로그인상태 확인
export const CHECK_STATUS = {
    REQUEST: 'user/CHECK_STATUS_REQUEST',
    SUCCESS: 'user/CHECK_STATUS_SUCCESS',
    FAILURE: 'user/CHECK_STATUS_FAILURE',
} as const



interface LogInfo {

}


export const setValidate = createAction(SET_VALIDATED); //ET_VALIDATED

export const setLoggedInfo = createAsyncAction(
    SET_LOGGED_INFO.REQUEST,
    SET_LOGGED_INFO.FAILURE,
    SET_LOGGED_INFO.SUCCESS
)<LogInfo, void, Error >();


export const logout = createAsyncAction(
    LOGOUT.REQUEST,
    LOGOUT.FAILURE,
    LOGOUT.SUCCESS,
)<null, boolean, Error >();


export const checkStatus = createAsyncAction(
    CHECK_STATUS.REQUEST,
    CHECK_STATUS.FAILURE,
    CHECK_STATUS.SUCCESS,
)<string, boolean, Error >();


const actions = {
    setValidate,
    logout,
    checkStatus
}

export default actions