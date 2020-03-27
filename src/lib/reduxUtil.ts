import produce from 'immer';
import { PayloadAction } from 'typesafe-actions';


interface TypedAction<T extends string> {
    type: T,
}

interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
    payload: P
}

interface ActionCreator<T extends string> {
    () :TypedAction<T>
}

interface PayloadActionCreator<T extends string,P> {
    (payload:P): TypedPayloadAction<T,P>
}




export type ActionType<T extends any > =  ReturnType<T[keyof T]>

export function actionBuilder<T extends string>(type: T): TypedAction<T>;
export  function actionBuilder<T extends string, P>(
    type: T,
    payload?: P,
): TypedPayloadAction<T, P>;


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
            // request(payload?: TRequestPayload | undefined) : NonUndefined<typeof payload, TypedAction<R>, PayloadAction<R,TRequestPayload>> {
                request(payload? :TRequestPayload|undefined ) {//:  typeof  payload extends undefined ? TypedAction<R>  : PayloadAction<R,TRequestPayload> {

                if(typeof payload !== 'undefined'){
                    return{
                        type: REQUEST,
                        payload
                    }
                }else{
                    return{
                        type: REQUEST,
                    }
                }
            },
            success(payload?: TResponsePayload |undefined ) {


                if(typeof payload !== 'undefined'){
                    return{
                        type: SUCCESS,
                        payload
                    }
                }else{
                    return{
                        type: SUCCESS,
                    }
                }
            },
            failure(payload? : TFailurePayload |undefined ) {
                if(typeof payload !== 'undefined'){
                    return{
                        type: FAILURE,
                        payload
                    }
                }else{
                    return{
                        type: FAILURE,
                    }
                }
            }
        }
    }
}

let s = 'banana';


// payload가 있을때 제네릭으로 페이로드 타입을 넘긴다.
export function createAction(type)
export function createAction<TRequestPayload>(type, payload?:TRequestPayload)

export function createAction(type,payload?){
    return (payload?) => actionBuilder(type,payload)
}



// payLaod 타입을 검증하기... 지금은 any로 들어간다.
export function createReducer<S, A extends TypedAction<string>>(
    initialState:S,
    handleMap: {
        [key in A['type']]: (state: S, actoin: Extract<A, TypedAction<key>>) => void
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
