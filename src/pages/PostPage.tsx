import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import SidebarContainer from '../containers/common/SideBarContainer'
const PostPage:React.FC = () => {
  return (
    <>
      <HeaderContainer />
      <SidebarContainer>
        <PostViewerContainer />
      </SidebarContainer>
    </>
  );
};

export default PostPage;
