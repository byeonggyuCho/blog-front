import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'store/modules/loading';
 
export const createRequestActionTypes = (type:string )=> {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE` ;
  return [type, SUCCESS , FAILURE];
};


/* 
  유틸함수의 재사용성을 높이기 위하여 함수의 파라미터는 언제나 하나의 값을 사용하도록 하고,
  action.payload 를 그대로 파라미터로 넣어주도록 설정합니다.
  만약에 여러가지 종류의 값을 파라미터로 넣어야 한다면 객체 형태로 만들어줘야 합니다.
*/
type PromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);


interface AsyncActionCreator<R extends any[], S extends any[], F extends any[] > {
  // ACTION: {
      request: (payload?: R[1])=> {type:R[0]}
      success: (payload?: S[1])=> {type:S[0]}
      failure: (payload?: F[1])=> {type:F[0]}
      [K :string]: (...payload: any[])=>any
  // }
}

export default function createRequestSaga <Param , RES>//<T1,P1, T2,P2, T3,P3>
(types:AsyncActionsTypes, api: PromiseCreatorFunction<Param, RES>) {
  // (types:AsyncActionCreator<[T1,P1],[T2,P2],[T3,P3]>, api: PromiseCreatorFunction<P1, P2>) {

return function*(action: {payload:Param,type:AsyncActionsTypes}) {

    yield put(startLoading(types.REQUEST)); // 로딩 시작
    try {
      const response = yield call(api, action.payload);
      yield put({
        type: types.SUCCESS,
        payload: response.data
      });
    } catch (e) {
      yield put({
        type: types.FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(types.REQUEST)); // 로딩 끝
  };
}

// export const fetchEntity = (entitiy, apiFn) =>
// function*(...params) {
//   yield put(entitiy.request());
//   try {
//     const data = yield call(apiFN, ...params);
//     yield put(entity.success(data));
//   } catch (err) {
//     yield put(entitiy.failure());
//   }
// };

// export const createEntityAction = entity => ({
//   request: () => ({ type: entity.REQUEST }),
//   success: data => ({ type: entitiy.SUCCESS, payload: data }),
//   failure: () => ({ type: entity.FAILURE }),
// });