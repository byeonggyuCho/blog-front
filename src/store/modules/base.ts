import * as api from 'lib/api/auth';
import createRequestSaga  from 'lib/createRequestSaga' 
import {createAction, createReducer, createAsyncAction} from 'lib/reduxUtil'
import { takeLatest } from 'redux-saga/effects';
// import {
//     ActionType,
//     createReducer,
//     createAction,
//     createAsyncAction 
// } from 'typesafe-actions'

// 비동기 타입
const LOGIN = {
    REQUEST: 'base/LOGIN_REQUEST',
    SUCCESS: 'base/LOGIN_SUCCESS',
    FAILURE: 'base/LOGIN_FAILURE'
} as const

const LOGOUT = {
    REQUEST: 'base/LOGOUT_REQUEST',
    SUCCESS: 'base/LOGOUT_SUCCESS',
    FAILURE: 'base/LOGOUT_FAILURE'
} as const

const CHECK_LOGIN = {
    REQUEST: 'base/CHECK_LOGIN_REQUEST',
    SUCCESS: 'base/CHECK_LOGIN_SUCCESS',
    FAILURE: 'base/CHECK_LOGIN_FAILURE'
} as const

const CHANGE_PASSWORD_INPUT = 'base/CHAGE_PASSWORD_INPUT'as const;
const SHOW_MODAL = 'base/SHOW_MODAL' as const;
const HIDE_MODAL = 'base/HIDE_MODAL'as const;
const INITIALIZE_LOGIN_MODAL = 'base/INITALIZE_LOGIN_MODAL'as const;
const TEMP_LOGIN = 'base/TEMP_LOGIN'as const;


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
)<string, undefined, Error>();

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



const loginSaga = createRequestSaga(LOGIN, api.login);
const logoutSaga = createRequestSaga(LOGOUT,api.logout);
const checkLoginSaga = createRequestSaga(CHECK_LOGIN,api.checkLogin);

export function* baseSaga(){
    yield takeLatest(LOGIN.REQUEST, loginSaga);
    yield takeLatest(LOGOUT.REQUEST, logoutSaga);
    yield takeLatest(CHECK_LOGIN.REQUEST, checkLoginSaga);
}



export interface StateBase {
    modal: {
        remove: boolean,
        login: boolean, // 추후 구현될 모달
        error: boolean,
        [propName: string]: any
    },
    loginModal: {
        password: string,
        error: boolean
    },
    logged: boolean, // 현재 로그인 상태
    error : boolean
}

// initial state
const initialSate : StateBase = {
    // 모달의 가시성 상태
    modal: {
        remove: false,
        login: false, // 추후 구현될 모달
        error: null,
        
    },
    loginModal: {
        password: '',
        error: false
    },
    logged: false, // 현재 로그인 상태
    error : false
};



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


// 하나의 유니온으로 만드는 유틸타입을 만들어야한다.  
type makeUnion<T> =  T[keyof  T ]



type map2<T> = {
    [K in keyof T] : T[K] extends AsyncAction ? makeUnion<T[K]>: T[K]
}

type actionCreatorUnion = makeUnion<map2< typeof actions>>;
type BaseAction = ReturnType<actionCreatorUnion>




// reducer 
export default createReducer<StateBase, BaseAction>(initialSate, {
    
    [SHOW_MODAL]: (state, {payload}) => {
        // return state.setIn(['modal', modalName], true);
            state.modal[payload] = true;
    },
    [HIDE_MODAL]: (state, action) => {
        //return state.setIn(['modal', modalName], false);
            state.modal[action.payload] = false;
    },
    [CHANGE_PASSWORD_INPUT]: (state, {payload}) => {
        // return  state.setIn(['loginModal', 'password'], value)
            state.loginModal.password = payload;
      },
    
 
    [TEMP_LOGIN]: (state,action) => {
        // return state.set('logged', true);
        state.logged = true
    },
     [INITIALIZE_LOGIN_MODAL]: (state, action) => {
        // 로그인 모달의 상태를 초기 상태로 설정 (텍스트/오류 초기화)
        //return state.set('loginModal', initialSate.get('loginModal'));

        state.loginModal.password = ''
        state.loginModal.error = false
    },

    // 얘네 필요없음... 필터링하는 로직이 필요함..
    [LOGOUT.REQUEST] : (state, action) => {
        // debugger;
    },
    [LOGOUT.SUCCESS]: (state,action) => {
        // return state.set('logged', false);
            state.logged = false;
    },
    [LOGOUT.FAILURE]: (state) => {
        // return state.set('logged', logged);
        state.logged = true
        
    },
    [LOGIN.REQUEST] : (state, action) => {

    },
    [LOGIN.SUCCESS]: (state,action) => {
        // return state.set('logged', true);
            state.logged = true;
    },
    [LOGIN.FAILURE]: (state) =>{
        // return state.setIn(['loginModal',   'error'],       true)
        //             .setIn(['loginModal',   'password'],    '');
        state.loginModal.error = true;
        state.loginModal.password = '';
    },

    [CHECK_LOGIN.REQUEST] : (state, action) => {

    },
    [CHECK_LOGIN.SUCCESS]: (state,action) => {
        // return state.set('logged', data.logged);
        // return produce(state, draft => {
            localStorage.logged = "false"
            state.logged = action.payload.logged;
        // })
    },
    [CHECK_LOGIN.FAILURE]: (state, {payload}) => {
        // return state.set('error', payload.error)
        state.modal.error = !!payload;
    }, 
  
});