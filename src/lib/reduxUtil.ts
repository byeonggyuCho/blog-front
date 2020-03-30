import produce from 'immer';
import { action } from 'typesafe-actions';
import { any } from 'prop-types';
import { Type } from 'tern';


interface Action<T extends string> {
    type: T,
}

interface PayloadAction<T extends string, P> extends Action<T> {
    payload: P
}

interface ActionCreator<T extends string> {
    () :Action<T>
}

interface PayloadActionCreator<T extends string,P> {
    (payload:P): PayloadAction<T,P>
}




export type ActionType<T extends any > =  ReturnType<T[keyof T]>

export function actionBuilder<T extends string>(type: T): Action<T>;
export  function actionBuilder<T extends string, P>(
    type: T,
    payload?: P,
): PayloadAction<T, P>;


export function actionBuilder(type, payload?) {
    return payload !== undefined ? {type, payload } : {type}
}



type NonUndefined<target, TCase, FCase> = target extends undefined ? TCase : FCase;
// export const checkLogin = createAsyncAction(
//     CHECK_LOGIN,
//     CHECK_LOGIN_SUCCESS,
//     CHECK_LOGIN_FAILURE
// )<undefined, boolean, Error>();
export function createAsyncAction<R extends string ,S extends string ,F extends string >(
    REQUEST : R,
    SUCCESS : S,
    FAILURE : F,
    CANCEL?
){
    return function asyncActionBuilder<TRequestPayload, TResponsePayload, TFailurePayload>(){
        return {
            // request(payload?: TRequestPayload | undefined) : NonUndefined<typeof payload, Action<R>, PayloadAction<R,TRequestPayload>> {
                request(payload? :TRequestPayload | undefined ) {//:  typeof  payload extends undefined ? Action<R>  : PayloadAction<R,TRequestPayload> {

                    return{
                        type: REQUEST,
                        payload : payload
                    }
            },
            success(payload?: TResponsePayload  ) {


                    return{
                        type: SUCCESS,
                        payload
                    }
            },
            failure(payload? : TFailurePayload  ) {
                    return{
                        type: FAILURE,
                        payload
                    }
            }
        }
    }
}

interface PayloadCreator<TreturnType> {
    (payload) : TreturnType
}

// type temp<TPayloadRequest,TPayloadResult>  = (payload: TPayloadRequest) => (result:TPayloadResult) 

// payload가 있을때 제네릭으로 페이로드 타입을 넘긴다.
export function createAction<Ttype extends string>(type:Ttype) : () => {type:Ttype}
export function createAction<Ttype extends string,TPayloadRequest,TPayloadResult>(type:Ttype ,
    payloadCreator : (payload: TPayloadRequest) => (TPayloadResult) ): (type:Ttype)=>{type:Ttype, payload:TPayloadResult}
    
    //PayloadAction<Ttype,TPayloadResult> //: ()=> {type:Ttype, payload: ReturnType<typeof payloadCreator>}
// export function createAction(type, payloadCreator?)

export function createAction<Ttype extends string, TPayloadType>(type:Ttype,payloadCreator?) : any{

    if(payloadCreator !== undefined){
        return (payload? : TPayloadType) => actionBuilder(type,payloadCreator(payload))
    }else{
        return () => actionBuilder(type)
    }
}



// payLaod 타입을 검증하기... 지금은 any로 들어간다.
export function createReducer<S, A extends Action<string>>(
    initialState:S,
    handleMap: {
        [key in A['type']]: (state: S, actoin: Extract<A, Action<key>>) => void
    },
) {
    return (state: S= initialState, action:A) => 
        produce(state, draft => {
            const handler = handleMap[action.type];
            if( handler ) {
                handler(draft, action)
            }
        });
    
}
