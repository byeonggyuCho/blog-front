import produce from 'immer';

interface TypedAction<T extends string> {
    type: T,
}

interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
    payload?: P
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


// export const checkLogin = createAsyncAction(
//     CHECK_LOGIN,
//     CHECK_LOGIN_SUCCESS,
//     CHECK_LOGIN_FAILURE
// )<undefined, boolean, Error>();
export function createAsyncAction(
    REQUEST,
    SUCCESS,
    FAILURE,
    CANCEL?
){
    return function asyncActionBuilder<TRequestPayload, TResponsePayload, TFailurePayload>(){
        return {
            request(payload?: TRequestPayload) {

                return{
                    type: REQUEST,
                    payload
                }
            },
            sucess(payload?: TResponsePayload) {

                return{
                    type: SUCCESS,
                    payload
                }
            },
            filure(payload? : TFailurePayload) {
                return {
                    type: FAILURE,
                    payload
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
