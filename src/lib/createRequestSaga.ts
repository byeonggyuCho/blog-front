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

      console.log('createRequestSaga_', response.status.toString())

      if(response.status.toString().startsWith(4)){
        yield put({
          type: type.FAILURE,
          payload: response.data,
          error: true,
        });
      }else{
        yield put({
          type: type.SUCCESS,
          payload: response.data,
          meta: response,
        });
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

      if(response.status.startwith(4)){
        yield put({
          type: type.FAILURE,
          payload: response.data,
          error: true,
        });
      }

      yield put({
        type: type.SUCCESS,
        payload: response.data,
        meta: response,
      });

      yield put(push(url));
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
