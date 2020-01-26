import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import Post from 'components/post/Post'
import AskRemoveModalContainer from 'containers/modal/AskRemoveModalContainer';

const PostPage = ({match}) => {

    const { id } = match.params;
    return (
        <PageTemplate>
            <Post id = {id}/>
            <AskRemoveModalContainer/>
        </PageTemplate>
    );
};

export default PostPage;