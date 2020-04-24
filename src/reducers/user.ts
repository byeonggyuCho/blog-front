import {
    ActionType,
    createReducer,
} from 'typesafe-actions'
import actions,{
    LOGOUT,
    CHECK_STATUS,
    SET_LOGGED_INFO,
    SET_VALIDATED
} from 'actions/user'
import {produce} from 'immer'



export interface StateUser{
    loggedInfo : {
        thumbnail :string,
        username: string
    },

    logged: boolean,
    validated: boolean
}


const initalState:StateUser = {
    loggedInfo : { // 현재 로그인중인 유저의 정보
        thumbnail :null,
        username: null
    },

    logged: false, // 현재 로그인중인지 알려준다
    validated: false// 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
}


type UserAction = ActionType<typeof actions>;

export default createReducer<StateUser,UserAction>(initalState,{
    [SET_LOGGED_INFO] : (state, action)=>
        produce(state, draft =>{
            draft.logged = true;
        })
    ,
    [SET_VALIDATED] : (state, action)=>{
        return produce(state, draft =>{
            draft.validated = action.payload
        })
    },
    [CHECK_STATUS.SUCCESS] : (state, action)=>{
        return state.loggedInfo = action.payload
    },
    [CHECK_STATUS.SUCCESS] : (state, action)=>{
        return initalState
    }

})