import produce from 'immer';

interface TypedAction<T extends string> {
    type: T,
}

interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
    payload?: P
}
// interface TypePaylaodWithMethAction<T extends string, P, M> extends TypedPayloadAction<T,P> {
//     meta?: M
// }

export function createAction<T extends string>(type: T): TypedAction<T>;
export  function createAction<T extends string, P, M>(
    type: T,
    payload?: P,
): TypedPayloadAction<T, P>;

// export  function createAction<T extends string, P, M>(
//     type: T,
//     payload?: P,
//     meta?: M
// ): TypePaylaodWithMethAction<T, P, M>;

export function createAction(type, payload?) {
    return payload !== undefined ? {type, payload } : {type}
}

export function createReducer<S, A extends TypedAction<string>>(
    initialState:S,
    handleMap: {
        [key in A['type']]: (state: S, actoin: Extract<A, TypedAction<key>>) => void
    },
) {
    return function(state: S= initialState, action:A) {
        return produce(state, draft => {
            const handler = handleMap[action.type];
            if( handler ) {
                handler(draft, action)
            }
        });
    };
}
