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
export const SHOW_MODAL = 'base/SHOW_MODAL' as const;
export const HIDE_MODAL = 'base/HIDE_MODAL'as const;
export const INITIALIZE_LOGIN_MODAL = 'base/INITALIZE_LOGIN_MODAL'as const;
export const TEMP_LOGIN = 'base/TEMP_LOGIN'as const;


export const INITIALIZE = 'editor/INITALIZE';
export const CHANGE_INPUT = 'editor/CHANGE_INPUT';


// async Action Types
export const WRITE_POST = {
    REQUEST : 'editor/WRITE_POST_REQUEST',
    SUCCESS : 'editor/WRITE_POST_SUCCESS',
    FAILURE : 'editor/WRITE_POST_FAILURE'
} as const
export const GET_POST = {
    REQUEST : 'editor/GET_POST_REQUEST',
    SUCCESS : 'editor/GET_POST_SUCCESS',
    FAILURE : 'editor/GET_POST_FAILURE'
} as const
export const EDIT_POST = {
    REQUEST : 'editor/EDIT_POST_REQUEST',
    SUCCESS : 'editor/EDIT_POST_SUCCESS',
    FAILURE : 'editor/EDIT_POST_FAILURE'
} as const





export const LIST = {
    REQUEST : 'list/LIST_POSTS_REQUEST',
    SUCCESS : 'list/LIST_POSTS_SUCCESS',
    FAILURE : 'list/LIST_POSTS_FAILURE'
} as const





export const START_LOADING = 'loading/START_LOADING';
export const FINISH_LOADING = 'loading/FINISH_LOADING';



