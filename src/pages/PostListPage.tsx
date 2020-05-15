import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import SidebarContainer from '../containers/common/SideBarContainer'


const PostListPage:React.FC = () => {
  return (
    <>
    <HeaderContainer />
    <SidebarContainer>
      <PostListContainer />
      <PaginationContainer />
    </SidebarContainer> 
      
    </>
  );
};

export default PostListPage;
