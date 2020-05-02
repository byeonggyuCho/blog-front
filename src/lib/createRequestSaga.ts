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

      console.log('createRequestSaga', type.REQUEST,action.payload)
      const response = yield call(request, action.payload);
      yield put({
        type: type.SUCCESS,
        payload: response.data,
        meta: response,
      });
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
