import {Meta, RequestPayload} from 'models'
import {  createAsyncAction } from 'typesafe-actions' 



export const LIST = {
    REQUEST : 'list/LIST_POSTS_REQUEST',
    SUCCESS : 'list/LIST_POSTS_SUCCESS',
    FAILURE : 'list/LIST_POSTS_FAILURE'
} as const


export const listPosts = createAsyncAction(
    LIST.REQUEST,
    LIST.SUCCESS, 
    LIST.FAILURE, 
)<RequestPayload, any, Meta>();


export default {
    listPosts
}

