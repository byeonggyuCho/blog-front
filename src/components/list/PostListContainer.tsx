import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import PostList from 'components/list/PostList';
import { listPosts } from 'actions/list';
import { RootState} from 'reducers'
import { useLocation, useParams} from 'react-router'
import {Dispatch} from 'redux'

// import Pagination from 'components/list/Pagination';

const ListContainer = () => {
    const dispatch:Dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const { postList, loading,user,error} = useSelector(
        ({ postList, loading,user } :RootState) => ({
            postList: postList.posts,
            error: postList.error,
            loading: loading['list/LIST_POSTS_REQUEST'],
            user: user.loggedInfo,
        }),
    );



    useEffect(()=>{
        const { username } =params;
        const {tag, page} = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });

        // 스크롤바를 맨 위로 올립니다
        document.documentElement.scrollTop = 0;

        dispatch(listPosts.request({ tag, username, page }));
    }, [dispatch, location.search, params])


    return (
        <PostList
            posts={postList}
            loading={loading}
            error={error}
            showWriteButton={!!user}
        />
    )
}

export default (ListContainer)