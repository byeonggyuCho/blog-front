import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import Post from 'components/post/Post'
import AskModalContainer from 'containers/modal/AskModalContainer';

const PostPage = ({match}) => {

    
    const { id } = match.params;
    return (
        <PageTemplate>
            <Post id = {id}/>
            <AskModalContainer/>
        </PageTemplate>
    );
};

export default PostPage;