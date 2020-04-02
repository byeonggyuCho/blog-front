import {
    createAction } from 'typesafe-actions'
  
  
export const START_LOADING = 'loading/START_LOADING';
export const FINISH_LOADING = 'loading/FINISH_LOADING';


/*
 요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
*/
export const startLoading = createAction(
    START_LOADING,
    action => (type:string) => action(type)
)
  
export const finishLoading = createAction(
    FINISH_LOADING,
    actoin => (type:string) => actoin(type)
)
