import {createAsyncAction,createAction} from 'typesafe-actions'
import {Post} from '../models';


export const LIST_POSTS = {
  REQUEST: "posts/LIST_POSTS_REQUEST",
  SUCCESS: "posts/LIST_POSTS_SUCCESS",
  FAILURE: "posts/LIST_POSTS_FAILURE"
} as const

interface PostRequest {
  tag : string
  username: string  
  page: string 
}

export const listPosts = createAsyncAction(
  [LIST_POSTS.REQUEST, (req:PostRequest)=>req],
  [LIST_POSTS.SUCCESS, (res:Post[])=>res],
  [LIST_POSTS.FAILURE, (err:Error)=>err]
)

