import {createAction , createAsyncAction} from 'typesafe-actions'






// // validated 값 설정
// export const SET_LOGGED_INFO = {
//     REQUEST: 'user/SET_LOGGED_INFO_REQUEST',
//     SUCCESS: 'user/SET_LOGGED_INFO_SUCCESS',
//     FAILURE: 'user/SET_LOGGED_INFO_FAILURE',
// } as const


export const SET_VALIDATED = 'user/SET_VALIDATED'; // validated 값 설정
export const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO' // 로그인 정보 설정



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




export const setValidated = createAction( SET_VALIDATED, 
    action => (validated:boolean) => action(validated)
    
); //ET_VALIDATED

export const setLoggedInfo = createAction(SET_LOGGED_INFO, 
    action =>  (loggedInfo: any) => action(loggedInfo)
);

// export const setLoggedInfo = createAsyncAction(
//     SET_LOGGED_INFO.REQUEST,
//     SET_LOGGED_INFO.FAILURE,
//     SET_LOGGED_INFO.SUCCESS
// )<LogInfo, void, Error >();


export const logout = createAsyncAction(
    LOGOUT.REQUEST,
    LOGOUT.SUCCESS,
    LOGOUT.FAILURE,
)<null, boolean, Error >();


interface UserInfo {
    thumbnail:string,  
    username: string
}


export const checkStatus = createAsyncAction(
    CHECK_STATUS.REQUEST,
    CHECK_STATUS.SUCCESS,
    CHECK_STATUS.FAILURE,
)<null, UserInfo, Error >();


const actions = {
    setValidated,
    setLoggedInfo,
    logout,
    checkStatus
}

export default actions