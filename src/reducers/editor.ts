import {   ActionType,   createReducer,} from 'typesafe-actions'

import actions,{
    WRITE_POST,
     CHANGE_INPUT,
     INITIALIZE,
     GET_POST,
     EDIT_POST
} from 'actions/editor'




export interface StateEditor{
    title: string,
    tags:string,
    markdown: string,
    postId: string,
    id: string,
    [propName: string]: any
}

// initial state
const initialSate : StateEditor = {
    title: '',
    tags:'',
    markdown: '',
    postId: '',
    id: '',
};


type EditorAction = ActionType<typeof actions>


// reducer
export default createReducer<StateEditor,EditorAction>(initialSate,{
    [INITIALIZE]: (state, action) => initialSate,
    [CHANGE_INPUT]: (state, actoin) => {

        let re = { 
            ...state,   
         [actoin.payload.name] : actoin.payload.value
         }
       return re
    },
    [WRITE_POST.REQUEST]: (state, action)=>({
        ...state
    }),
    [WRITE_POST.SUCCESS]: (state, action) => ({
        ...state,
        ...initialSate,
        postId: action.payload._id
    }),
  
    [WRITE_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [GET_POST.SUCCESS]: (state, { payload }) => ({
        ...state,
        payload: payload,
        title: payload.title,
        markdown: payload.body,
        tags: payload.tags.join(', ')
    }),
    [GET_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),

    [EDIT_POST.SUCCESS]: (state, { payload }) => ({
        ...state,
        ...initialSate
    }),
    [EDIT_POST.FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
    }),
    

});