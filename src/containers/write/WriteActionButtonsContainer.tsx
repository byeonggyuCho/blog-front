import React from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost, updatePost } from '../../actions/write';
import {RootState} from '../../reducers'

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }:RootState) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );

  // 포스트 등록
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost.request({ title, body, tags, _id: originalPostId }));
    }else{
      dispatch( writePost.request({ title, body, tags }) );
    }
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패시 할 작업
  // saga에서 처리해야함.
  // useEffect(() => {
    // if (post) {
    //   const { _id, user } = post;
    //   history.push(`/@${user.profile.username}/${_id}`);
    // }
    // if (postError) {
    //   console.log(postError);
    // }
  // }, [history, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
