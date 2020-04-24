import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import ListWrapper from '../components/list/ListWrapper';
import PostListContainer from '../components/list/PostListContainer';

/**
 * 
 * @param param0 
 * @description
 *  레프트박스만들기
 */


const PostList  = () => {

    // page의 기본 값을 1로 설정
    return (
        <PageTemplate>
            <ListWrapper>
                <PostListContainer />
            </ListWrapper>
        </PageTemplate>
    );
};


export default PostList;