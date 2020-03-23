// import { createAction, handleActions } from 'redux-actions';

import {
  ActionType,
  createReducer,
  createAction,
  createAsyncAction } from 'typesafe-actions'


const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
 요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
*/
export const startLoading = createAction(
  START_LOADING,
  action => {
    return (type:string) => action(type);
  }
);

export const finishLoading = createAction(
  FINISH_LOADING,
  action => {
    return (type:string) => action(type);
  }
);



export interface StateLoading {
  [propName: string]: boolean;
}

const initialState : StateLoading= {};

const actions = {
  startLoading,
  finishLoading
}

type LoadingAction = ActionType<typeof actions>;



const loading = createReducer<StateLoading,LoadingAction >(initialState,
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