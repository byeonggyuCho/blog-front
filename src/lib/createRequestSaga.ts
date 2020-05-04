import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../actions/loading';
import { push } from 'connected-react-router';

export const createRequestActionTypes =( type:string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};



export function createRequestSaga(type, request) {

  return function*(action) {
    yield put(startLoading(type.REQUEST)); // 로딩 시작
    try {

      const response = yield call(request, action.payload);
      const {data, status,message} = response.data;

      console.log('[CRS]',response.data)

      if(status === 'S'){
        yield put({
          type: type.SUCCESS,
          payload: data,
          meta: response,
        });
      }else{
        throw new Error(message)
      }
     
    } catch (e) {
      yield put({
        type: type.FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type.REQUEST)); // 로딩 끝
  };
}




export  function createRequestSagaAndRedirection(type, request,url) {

  return function*(action) {
    yield put(startLoading(type.REQUEST)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      const {data, status,message} = response.data;

      console.log('[CRS]',response.data)

      if(status === 'S'){
        yield put({
          type: type.SUCCESS,
          payload: data,
          meta: response,
        });
      }else{
        throw new Error(message)
      }

      yield put(push(url));
    } catch (e) {
      yield put({
        type: type.FAILURE,
        payload: e.message,
        error: true,
      });
    }
    yield put(finishLoading(type.REQUEST)); // 로딩 끝
  };
}
