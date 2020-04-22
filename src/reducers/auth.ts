import actions,{CHANGE_INPUT, INITIALIZE_FORM, CHECK_EMAIL_EXISTS, CHECK_USERNAME_EXISTS} from 'actions/auth'
import { ActionType,     createReducer,} from 'typesafe-actions'
import {produce} from 'immer'


export interface StateAuth {
    register: {
        form : {
            email: string,
            username: string,
            password: string,
            passwordConfirm: string
        },
        exists :{
            email: boolean,
            username : boolean
        }
    },
    login: {
        form: {
            email: string,
            password: string
        }
    }
}



const initialState:StateAuth = {
    register: {
        form : {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        },
        exists: {
            email: false,
            username: false
        }
    },
    login: {
        form: {
            email: '',
            password: ''
        }
    }
}



type AuthAction = ActionType<typeof actions>


export default createReducer<StateAuth,AuthAction>(initialState,{
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        // return state.setIn([form, 'form', name], value);
        return produce(state, draft =>{
            
            draft.login.form[name] = value;
        }
        
    },
    [INITIALIZE_FORM]: (state, action) => {


        return produce(state, draft => {
            const initialForm = initialState[action.payload];
            draft[action.paylaod] = initialForm
        })
    },

    [CHECK_EMAIL_EXISTS.SUCCESS]: (state, action )=> {
        // return (state, action) => state.setIn(['register', 'exists', 'email'], action.payload.data.exists)
        return produce(state, draft =>{
            draft.register.exists.email = action.payload.data.exists;
        })
        //(state, action) => state.register.exists.email = action.payload.data.exists;
        //.setIn(['register', 'exists', 'email'], action.payload.data.exists)
    },
    [CHECK_USERNAME_EXISTS.SUCCESS]:(state, action) => {
        return produce(state, draft =>{
            draft.register.exists.username = action.payload.data.exists;
        })
    }

}
