declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
  }

declare interface AsyncActionsTypes {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
}

declare interface AsyncAction {
  request: (...arg : any)=> any
  success: (...arg : any)=> any
  failure: (...arg : any)=> any
}
// API
declare type ApiCall<Params extends any[], Res> = (...args: Params) => Promise<Res>;
