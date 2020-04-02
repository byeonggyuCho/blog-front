import {
    createAsyncAction
} from 'typesafe-actions'
import {Post} from 'models'

export const GET_POST = {
    REQUEST :  'post/GET_POST_REQUEST',
    SUCCESS :  'post/GET_POST_SUCCESS',
    FAILURE :  'post/GET_POST_FAILURE'
} as const
export const REMOVE_POST = {
    REQUEST :  'post/REMOVE_POST_REQUEST',
    SUCCESS :  'post/REMOVE_POST_SUCCESS',
    FAILURE :  'post/REMOVE_POST_FAILURE'
} as const



// actoin creator
export const getPost = createAsyncAction(
    GET_POST.REQUEST ,  
    GET_POST.SUCCESS , 
    GET_POST.FAILURE 
) <string, Post, Error>();

export const removePost = createAsyncAction(
    REMOVE_POST.REQUEST , 
    REMOVE_POST.SUCCESS ,
    REMOVE_POST.FAILURE 
) <string, any, Error>();

export default {
    getPost,
    removePost
}