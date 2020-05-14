import produce from 'immer';
import {createReducer, ActionType} from 'typesafe-actions'
import actions, {
  CHANGE_FIELD,
  INITIALIZE_FORM, 
  REGISTER,
  LOGIN,
  LOGOUT,
  CHECK,
  TEMP_SET_USER,
} from '../actions/auth'


export interface StateAuth {
  register: {
    username: string
    password: string
    passwordConfirm: string
  },
  login: {
    username: string
    password: string
  },
  auth: any,
  authError: any
}

const initialState:StateAuth = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {        // 로그인 요청시 아이디 페스워드 (암호화)저장
    username: '',
    password: ''
  },
  auth: null,     // 로그인 정보
  authError: null
};


type AuthAction = ActionType<typeof actions>

const auth = createReducer<StateAuth, AuthAction>(initialState, 
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER.SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      register: initialState.register,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER.FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN.SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      login:initialState.login,  // 초기화.
      auth
    }),
    // 로그인 실패
    [LOGIN.FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [TEMP_SET_USER]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [CHECK.SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      checkError: null,
    }),
    [CHECK.FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: null,
      checkError: error,
    }),
    [LOGOUT.SUCCESS]: state => ({
      ...state,
      auth: null,
    }),
  }
);

export default auth;
