
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

declare interface AsyncActionCreator {
  // ACTION: {
      request: (...payload: any[])=>any
      success: (...payload: any[])=>any
      failure: (...payload: any[])=>any
      [K :string]: (...payload: any[])=>any
  // }
}

// declare type PayloadAction<Type, Tpayload> = {
//   type: Type,
//   payload: Tpayload
// }
/* 
declare interface AsyncActionCreator<R extends any[], S extends any[], F extends any[] > {
  // ACTION: {
      request: (payload?: R[1])=> {type:R[0]}
      success: (payload?: S[1])=> {type:S[0]}
      failure: (payload?: F[1])=> {type:F[0]}
      [K :string]: (...payload: any[])=>any
  // }
} */