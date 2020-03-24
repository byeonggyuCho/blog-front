// import {createAction, handleActions} from 'redux-actions';
import * as api from 'lib/api';
import produce from 'immer';
import createRequestSaga, {createRequestActionTypes} from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';
import {
    ActionType,
    createReducer,
    createAction,
    createAsyncAction 
} from 'typesafe-actions'


// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'base/LOGIN'
);
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE]  = createRequestActionTypes(
    'base/LOGOUT'
);
const [CHECK_LOGIN, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAILURE] = createRequestActionTypes(
    'base/CHECK_LOGIN'
);
const CHANGE_PASSWORD_INPUT = 'base/CHAGE_PASSWORD_INPUT';
const INITIALIZE_LOGIN_MODAL = 'base/INITALIzE_LOGIN_MODAL';
const TEMP_LOGIN = 'base/TEMP_LOGIN';

// actoin creators
export const showModal = createAction(SHOW_MODAL, 
    action => (modalName: string) => action(modalName)
)
export const hideModal = createAction(HIDE_MODAL, 
    action => (modalName: string) => action(modalName)
)

export const login = createAsyncAction(
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
)<string, null, Error>();
export const logout = createAsyncAction(
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
)<undefined, null, Error>();

export const checkLogin = createAsyncAction(
    CHECK_LOGIN,
    CHECK_LOGIN_SUCCESS,
    CHECK_LOGIN_FAILURE
)<undefined, boolean, Error>();
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT,
    action => (password: string) => action(password)
);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const tempLogin = createAction(TEMP_LOGIN);

const loginSaga = createRequestSaga(LOGIN,api.login);
const logoutSaga = createRequestSaga(LOGOUT,api.logout);
const checkLoginSaga = createRequestSaga(CHECK_LOGIN,api.checkLogin);

export function* baseSaga(){
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(CHECK_LOGIN, checkLoginSaga);
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
    showModal,
    hideModal,
    changePasswordInput,
    initializeLoginModal,
    tempLogin,
    login,
    logout,
    checkLogin
}
type BaseAction = ActionType<typeof actions>



// reducer 
export default createReducer<StateBase, BaseAction>(initialSate, {
    
    [SHOW_MODAL]: (state, {payload}) => {
        // return state.setIn(['modal', modalName], true);
        return produce(state, draft => {
            draft.modal[payload] = true;
        })
    },
    [HIDE_MODAL]: (state, { payload }) => {
        //return state.setIn(['modal', modalName], false);
        return produce(state, draft => {
            draft.modal[payload] = true;
        })
    },
    [CHANGE_PASSWORD_INPUT]: (state, {payload}) => {
        // return  state.setIn(['loginModal', 'password'], value)
          return produce(state, draft => {
              draft.loginModal.password = payload.password;
          })
      },
 
    [TEMP_LOGIN]: (state,action) => {
        // return state.set('logged', true);
        return produce(state, draft => {
            draft.logged = true
        })
    },
     [INITIALIZE_LOGIN_MODAL]: (state, action) => {
        // 로그인 모달의 상태를 초기 상태로 설정 (텍스트/오류 초기화)
        //return state.set('loginModal', initialSate.get('loginModal'));

        return produce(state, draft => {
            draft.loginModal.password = ''
            draft.loginModal.error = false
        })
    },

    [LOGOUT_SUCCESS]: (state,action) => {
        // return state.set('logged', false);
        return produce(state, draft => {
            draft.logged = false;
        })
    },
    [LOGOUT_FAILURE]: (state) => {
        // return state.set('logged', logged);
        return produce(state, draft => {
            draft.logged = true
        })
        
    },
    [LOGIN_SUCCESS]: (state) => {
        // return state.set('logged', true);
        return produce(state, draft => {
            draft.logged = true;
        })
    },
    [LOGIN_FAILURE]: (state) =>{
        // return state.setIn(['loginModal',   'error'],       true)
        //             .setIn(['loginModal',   'password'],    '');
        return produce(state, draft => {
            draft.loginModal.error = true;
            draft.loginModal.password = '';
        })
    },
   

  

    [CHECK_LOGIN_SUCCESS]: (state) => {
        // return state.set('logged', data.logged);
        return produce(state, draft => {
            draft.logged = true;
        })
    },
    [CHECK_LOGIN_FAILURE]: (state, {payload}) => {
        // return state.set('error', payload.error)
        
        return produce(state, draft => {
            draft.modal.error = payload;
        })
    },
  
});