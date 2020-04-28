import { createReducer, ActionType } from 'typesafe-actions'
import { User } from '../models'
import actions,{
  TEMP_SET_USER,
  LOGOUT,
  CHECK
} from '../actions/user'


interface StateUser {
  user :User
  checkError: Error
}


const initialState: StateUser = {
  user: null,
  checkError: null,
};

type Actions = ActionType<typeof actions>


export default createReducer<StateUser,Actions>(initialState,
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK.SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK.FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),
  },
);
