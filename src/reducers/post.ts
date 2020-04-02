import {
    ActionType,
    createReducer,
} from 'typesafe-actions'
import actions, {
    GET_POST,
    REMOVE_POST
} from 'actions/post'


export interface StatePost {
    post:string,
    tags:string[],
    body:string,
    publishedDate:string,
    title: string
};

// initial state
const initialSate : StatePost = {
    post:'',
    tags:[],
    body:'',
    publishedDate:'',
    title: ''
};

type PostAction = ActionType<typeof actions>;


// reducer
export default createReducer<StatePost, PostAction>(initialSate, {
    [GET_POST.SUCCESS]: (state, { payload}) => ({
        ...state,
        ...payload,
    }),
    [GET_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    [REMOVE_POST.SUCCESS]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [REMOVE_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

});