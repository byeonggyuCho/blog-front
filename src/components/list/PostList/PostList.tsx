import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';
import {Post} from 'models'
import styled from 'styled-components';
import Responsive from 'components/common/Responsive';
import SubInfo from 'components/common/SubInfo';
import Tags from 'components/common/Tags';
import palette from 'lib/styles/palette';

const cx = classNames.bind(styles);

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

interface PostItemInterface extends Post {
    user : any
}


const PostItem:React.FC<PostItemInterface>=  function (post)  {

    const { publishedDate, user, tags, title, body, _id } = post;
    const tagList = tags.map(
        tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
    )

    return (
        <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
    )
}


interface Props {
    posts: Post[]
    loading:boolean
    error:Error
    showWriteButton:boolean
}

const PostList = ({posts}: Props) => {

    const postList = posts.map(
        (post,i)=> {
            const { _id, title, body, publishedDate, tags } = post;

            return (
                <PostItem
                    title={title}
                    body={body}
                    publishedDate={publishedDate}
                    tags={tags}
                    key={_id}
                    id={_id}
                />
            )
        }
    );

    return (
        <div className={cx('post-list')}>
            {postList}
        </div>
    )
}

export default PostList;