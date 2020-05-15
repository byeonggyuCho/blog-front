import {createReducer, ActionType} from 'typesafe-actions'
import actions,{SHOW_MENUE} from '../actions/base'


type AuthAction = ActionType<typeof actions>


interface StateBase{
    showSlide: boolean
}


const initialState:StateBase = {
    showSlide : false
}


const base = createReducer<StateBase, AuthAction>(initialState, {
    [SHOW_MENUE]:(state, { payload })=>({
        ...state,
        showSlide:payload
    })
})

export default base;