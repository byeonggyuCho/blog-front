
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postsAPI from 'lib/api/posts.js';
import { takeLatest } from 'redux-saga/effects';
// import { List } from 'immutable';
// import * as api from 'lib/api';
/* 

// action types
const GET_POST_LIST = 'list/GET_POST_LIST';

// action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);
 */
const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
  ] = createRequestActionTypes('posts/LIST_POSTS');
  
export const listPosts = createAction(
    LIST_POSTS,
    ({ tag,username, page}) => ({ tag, username, page})
)

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listposts)

export function* listSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}



const initialSate = {
    posts: [],
    error: null,
    lastPage: 1,
};

// reducer
const list = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'],10), // 숫자로 형변환₩
        }),
        [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        })
    },
    // ...pender({
    //     type: GET_POST_LIST,
    //     onSuccess: (state, action) => {
    //         const { data: posts } = action.payload;
    //         const lastPage = action.payload.headers['last-page']
    //         return state.set('posts', fromJS(posts))
    //                     .set('lastPage', parseInt(lastPage, 10));
    //     }
    // })
  //  },
initialSate
);

export default list;