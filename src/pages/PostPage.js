import React from 'react';
import PageTemplate from '../components/common/PageTemplate'
import Post from '../components/post/Post'

const PostPage = () => {

    const { id } = match.params;
    return (
        <PageTemplate>
            <Post id = {id}/>
        </PageTemplate>
    );
};

export default PostPage;