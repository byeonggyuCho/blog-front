import {createAction, createAsyncAction} from 'lib/reduxUtil'

export const LOGIN = {
    REQUEST: 'base/LOGIN_REQUEST',
    SUCCESS: 'base/LOGIN_SUCCESS',
    FAILURE: 'base/LOGIN_FAILURE'
} as const

export const LOGOUT = {
    REQUEST: 'base/LOGOUT_REQUEST',
    SUCCESS: 'base/LOGOUT_SUCCESS',
    FAILURE: 'base/LOGOUT_FAILURE'
} as const

export const CHECK_LOGIN = {
    REQUEST: 'base/CHECK_LOGIN_REQUEST',
    SUCCESS: 'base/CHECK_LOGIN_SUCCESS',
    FAILURE: 'base/CHECK_LOGIN_FAILURE'
} as const

export const CHANGE_PASSWORD_INPUT = 'base/CHAGE_PASSWORD_INPUT'as const;
export const INITIALIZE_LOGIN_MODAL = 'base/INITALIZE_LOGIN_MODAL'as const;
export const SHOW_MODAL = 'base/SHOW_MODAL' as const;
export const HIDE_MODAL = 'base/HIDE_MODAL'as const;
export const TEMP_LOGIN = 'base/TEMP_LOGIN'as const;



// actoin creators
export const showModal = createAction(SHOW_MODAL, 
    (modalName: string) => (modalName)
);
export const hideModal = createAction(HIDE_MODAL, 
    (modalName: string) => (modalName)
)
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT,
    (password: string) => (password)
)
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const tempLogin = createAction(TEMP_LOGIN);


// Entity 선언.
export const login = createAsyncAction(
    LOGIN.REQUEST,
    LOGIN.SUCCESS,
    LOGIN.FAILURE
)<string, { success: boolean }, Error>();

export const logout = createAsyncAction(
    LOGOUT.REQUEST,
    LOGOUT.SUCCESS,
    LOGOUT.FAILURE
)<undefined, undefined, Error>();

export const checkLogin = createAsyncAction(
    CHECK_LOGIN.REQUEST,
    CHECK_LOGIN.SUCCESS,
    CHECK_LOGIN.FAILURE
)<undefined, {logged: boolean}, Error>();


const actions = {
    login,
    logout,
    checkLogin,
    showModal,
    hideModal,
    changePasswordInput,
    initializeLoginModal,
    tempLogin,
}

export default  actions