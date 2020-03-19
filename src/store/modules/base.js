import {createAction, handleActions} from 'redux-actions';
import * as api from 'lib/api';
import {Map} from 'immutable';
import createRequestSaga, {createRequestActionTypes} from 'lib/createRequestSaga' 
import { takeLatest } from 'redux-saga/effects';

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
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const checkLogin = createAction(CHECK_LOGIN);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
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



// initial state
const initialSate = Map({
    // 모달의 가시성 상태
    modal: Map({
        remove: false,
        login: false // 추후 구현될 모달
    }),
    loginModal: Map({
        password: '',
        error: false
    }),
    logged: false, // 현재 로그인 상태
    error : null
});




// reducer 
export default handleActions({
    [SHOW_MODAL]: (state, { payload: modalName }) => {
        return state.setIn(['modal', modalName], true);
    },
    [HIDE_MODAL]: (state, { payload: modalName }) => {
        return state.setIn(['modal', modalName], false);
    },
    [LOGIN_SUCCESS]: (state, {payload}) => {
        return state.set('logged', true);
    },
    [LOGIN_FAILURE]: (state, {payload}) =>{
        return state.setIn(['loginModal',   'error'],       true)
                    .setIn(['loginModal',   'password'],    '');
    },
    [LOGOUT_SUCCESS]: (state, {payload: data} ) => {
        return state.set('logged', false);
    },
    [LOGOUT_FAILURE]: (state, {payload: data} ) => {
        return state.set('logged', logged);
    },
    [CHECK_LOGIN_SUCCESS]: (state, {payload: data}) => {
        return state.set('logged', data.logged);
    },
    [CHECK_LOGIN_FAILURE]: (state, {payload}) => {
        return state.set('error', payload.error)
    },

    [CHANGE_PASSWORD_INPUT]: (state, { payload: value }) => {
       return  state.setIn(['loginModal', 'password'], value)
},
    [INITIALIZE_LOGIN_MODAL]: (state, action) => {
        // 로그인 모달의 상태를 초기 상태로 설정 (텍스트/오류 초기화)
        return state.set('loginModal', initialSate.get('loginModal'));
    },
    [TEMP_LOGIN]: (state, action) => {
        return state.set('logged', true);
    }
},initialSate);