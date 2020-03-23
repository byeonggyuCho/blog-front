import produce from 'immer';

interface TypedAction<T extends string> {
    type: T,
}

interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
    payload?: P
}

export function createAction<T extends string>(type: T): TypedAction<T>;
export  function createAction<T extends string, P, M>(
    type: T,
    payload?: P,
): TypedPayloadAction<T, P>;


export function createAction(type, payload?) {
    return payload !== undefined ? {type, payload } : {type}
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
