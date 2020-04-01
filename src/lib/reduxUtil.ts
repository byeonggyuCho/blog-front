import produce from 'immer';
// import { action } from 'typesafe-actions';
// import { any } from 'prop-types';
// import { Type } from 'tern';






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
export function createAsyncAction<R  ,S  ,F >(
    REQUEST : R,
    SUCCESS : S,
    FAILURE : F,
    // CANCEL?
){
    return <RP, SP, FP>() : AsyncActionCreator<[R,RP],[S,SP],[F,FP]> =>({
        request: (payload: RP) => ({type: REQUEST, payload}),
        success: (payload: SP) => ({type: SUCCESS, payload}),
        failure: (payload: FP) => ({type: FAILURE, payload}),
    })
}



interface PayloadCreator<TreturnType> {
    (payload) : TreturnType
}


// 객체 타입의 비동기 액션을 유니온 타입 액션으로 만든다.
// type ActionTypes< T extends AsyncActionCreator> = ReturnType<T[keyof T]>;




// type temp<TPayloadRequest,TPayloadResult>  = (payload: TPayloadRequest) => (result:TPayloadResult) 

// payload가 있을때 제네릭으로 페이로드 타입을 넘긴다.
export function createAction<Ttype extends string>(type:Ttype) : () => {type:Ttype}
export function createAction<Ttype extends string,TPayloadRequest,TPayloadResult>(type:Ttype ,
    payloadCreator : (payload: TPayloadRequest) => (TPayloadResult) ): (payload:TPayloadResult)=>{type:Ttype, payload:TPayloadResult}
    
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
        [key in A['type']]: (state: S, action: Extract<A, Action<key>>) => void
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
