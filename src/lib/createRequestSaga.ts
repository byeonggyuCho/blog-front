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



export default function createRequestSaga <Param , RES>
(types:AsyncActionTypes<string,string,string>, api: PromiseCreatorFunction<Param, RES>) {

// return function*(action: {payload:Param,type:AsyncActionsTypes}) {
return function*(action: PayloadAction<AsyncActionTypes<string,string,string>, Param>) {

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