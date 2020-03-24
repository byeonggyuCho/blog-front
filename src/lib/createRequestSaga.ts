import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'store/modules/loading';
 
export const createRequestActionTypes = (type:string )=> {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type:string, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;


  return function*(action) {

    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      console.log('lib',response.data)
      yield put({
        type: SUCCESS,
        payload: response.data
      });
    } catch (e) {
      console.log('lib_ERR',e)
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
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