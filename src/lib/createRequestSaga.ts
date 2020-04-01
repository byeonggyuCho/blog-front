import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'store/modules/loading';
 
export const createRequestActionTypes = (type:string )=> {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE` ;
  return [type, SUCCESS , FAILURE];
};






export default function createRequestSaga <Param , RES>
(types:AsyncActionTypes<string,string,string>, api: PromiseCreatorFunction<Param, RES>) {

// return function*(action: {payload:Param,type:AsyncActionsTypes}) {
return function*(action: PayloadAction<AsyncActionTypes<string,string,string>, Param>) {

    yield put(startLoading(types.REQUEST)); // 로딩 시작

   console.log('[createRequest] before request', types.REQUEST);

    try {
      const response = yield call(api, action.payload);

      console.log('[createRequest] after request', types.REQUEST)
      // if(types.REQUEST.includes('LOGOUT'))  console.log('in saga logout reqeust')
      yield put({
        type: types.SUCCESS,
        payload: response.data
      });
      console.log('[createRequest] ', types.SUCCESS, 'DONE!!')
    } catch (e) {
      console.error(e)
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