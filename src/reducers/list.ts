
import {   ActionType,createReducer, } from 'typesafe-actions'
import {Post} from 'models'
import actions, {LIST} from 'actions/list'


export interface SateList {
    posts: Post[],
    error: object,
    lastPage: number,
}

const initialSate: SateList = {
    posts: [],
    error: null,
    lastPage: 1,
};

type ListAction = ActionType<typeof actions>;

// reducer
const list = createReducer<SateList,ListAction >(initialSate, {
        [LIST.SUCCESS]: (state, action) => ({
            ...state,
            posts: action.payload,
            // lastPage: parseInt(action.payload.headers['last-page'],10), // 숫자로 형변환₩
        }),
        [LIST.FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        })
    }
);

export default list;