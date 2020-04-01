
// 여기 파일 분리 어떻게 함???
// 이름 중복은 어떻게 피함?

declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
  }


declare interface AsyncActionTypes<R, S, F> {
  REQUEST :R;
  SUCCESS :S;
  FAILURE :F
}


declare interface AsyncAction {
  request: (...arg : any)=> any
  success: (...arg : any)=> any
  failure: (...arg : any)=> any
}
// API
declare type ApiCall<Params extends any[], Res> = (...args: Params) => Promise<Res>;



interface Action<T> {
  type: T,
}

declare interface PayloadAction<T, P> extends Action<T> {
  payload: P
}

interface ActionCreator<T extends string> {
  () :Action<T>
}

interface PayloadActionCreator<T extends string,P> {
  (payload:P): PayloadAction<T,P>
}



// declare type PayloadAction<Type, Tpayload> = {
//   type: Type,
//   payload: Tpayload
// }

// declare interface AsyncActionCreator {
//   // ACTION: {
//       request: (...payload: any[])=>any
//       success: (...payload: any[])=>any
//       failure: (...payload: any[])=>any
//       [K :string]: (...payload: any[])=>any
//   // }
// }
declare interface AsyncActionCreator<R extends any[], S extends any[], F extends any[] > {
  // ACTION: {
      request: (payload?: R[1])=> {type:R[0], payload:R[1]}
      success: (payload?: S[1])=> {type:S[0], payload:S[1]}
      failure: (payload?: F[1])=> {type:F[0], payload:F[1]}
      // [K :string]: (...payload: any[])=>any
  // }
} 

/* 
  유틸함수의 재사용성을 높이기 위하여 함수의 파라미터는 언제나 하나의 값을 사용하도록 하고,
  action.payload 를 그대로 파라미터로 넣어주도록 설정합니다.
  만약에 여러가지 종류의 값을 파라미터로 넣어야 한다면 객체 형태로 만들어줘야 합니다.
*/
declare type PromiseCreatorFunction<P, T> = ((payload?: P) => Promise<T>) | (() => Promise<T>);