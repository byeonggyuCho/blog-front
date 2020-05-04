import actions, {START_LOADING, FINISH_LOADING} from '../actions/loading'
import {createReducer, ActionType} from 'typesafe-actions'

interface StateLoding {
  [props: string] : boolean
}

type Actions = ActionType<typeof actions>

const initialState :StateLoding = {};

const loading = createReducer<StateLoding,Actions>(initialState,
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  }
);

export default loading;
