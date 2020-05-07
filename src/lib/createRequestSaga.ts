import { call, put,fork } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../actions/loading';
import { push } from 'connected-react-router';

export const createRequestActionTypes =( type:string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};



interface AsyncAPI<reqData, resData> {
  (req?:reqData): Promise<resData>
}



interface CreateRequestSaga{
  (type:any, request:AsyncAPI<any,any>, callback?:any ) : (action:Action) => any
}


interface Action {
  payload: any
  type: string
  meta?: any
}



export const createRedirectionSaga = function(path:string){

  return function*(){
    yield put(push(path))
  }

}


export const createRequestSaga:CreateRequestSaga  =  function (type, request, callback) {

  return function*(action) {
    yield put(startLoading(type.REQUEST)); // 로딩 시작
    try {

      const response = yield call(request, action.payload);
      const {data, status,message} = response.data;


      if(status === 'S'){
        yield put({
          type: type.SUCCESS,
          payload: data,
          meta: response,
        });
      }else{
        throw new Error(message)
      }

      if(typeof callback === 'function'){
        yield fork(callback, data);
      }
     
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




export  function createRequestSagaAndRedirection(type, request,url) {

  return function*(action) {
    yield put(startLoading(type.REQUEST)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      const {data, status,message} = response.data;

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
