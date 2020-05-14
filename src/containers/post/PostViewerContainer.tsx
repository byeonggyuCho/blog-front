import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { readPost, unloadPost, removePost } from '../../actions/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../actions/write';
// import { removePost } from '../../lib/api/posts';
import {RootState} from '../../reducers'

const PostViewerContainer:React.FC = () => {

  // const history = useHistory();
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, auth }:RootState) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: auth.auth,
    }),
  );

  useEffect(() => {
    dispatch(readPost.request(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    // history.push('/write');
  };

  const onRemove = () => {
    try {
      dispatch(removePost.request(postId))
      // await removePost(postId);
      // history.push('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user.username) === (post &&post.user  && post.user.profile.username);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};



export default PostViewerContainer
