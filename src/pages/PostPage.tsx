import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import PostViewerContainer from 'containers/post/PostViewerContainer'
import AskModalContainer from 'containers/modal/AskModalContainer';

const PostPage = () => {

    
    return (
        <PageTemplate>
            <PostViewerContainer />
            <AskModalContainer/>
        </PageTemplate>
    );
};

export default PostPage;