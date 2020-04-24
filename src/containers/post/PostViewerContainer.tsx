import React, { useEffect } from 'react';
import * as postActions from 'actions/post';
import { useSelector, useDispatch} from 'react-redux';
import { RootState} from 'reducers'
import PostViewer from 'components/post/PostViewer'
import {  useParams} from 'react-router'


const PostViewerContainer: React.FC= ()=> {

    const { id } = useParams();

    const dispatch = useDispatch();
    const {loading, title, tags, body, publishedDate } = useSelector(
        (state: RootState)=>({
            loading: state.loading['post/GET_POST'],
            title: state.post.title,
            tags: state.post.tags,
            body: state.post.body,
            publishedDate: state.post.publishedDate,
        })
    )

    useEffect(()=>{
        dispatch( postActions.getPost.request(id))
    },[id])


    if(loading) return null;    // 로딩 중일 때는 아무것도 보여주지 않음.

    return (

        <PostViewer
            title={title} publishedDate={publishedDate} tags={tags}
            body={body}
        />
      
    )
}

export default PostViewerContainer
