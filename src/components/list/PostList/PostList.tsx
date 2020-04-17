import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';
import {Post} from 'models'

const cx = classNames.bind(styles);

interface PostItemProps {
    title:string
    body:string 
    publishedDate :string
    tags : string[]
    id : string
}

const PostItem =  function (props:PostItemProps)  {

    const {title, body, publishedDate, tags, id} = props
    const tagList = tags.map(
        tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
    )

    return (
        <div className={cx('post-item')}>
            <h2><Link to={`/post/${id}`}>{title}</Link></h2>
            <div className={cx('date')}>{moment(publishedDate).format('ll')}</div>
            <p>{removeMd(body)}</p>
            <div className={cx('tags')}>
                {tagList}
            </div>
        </div>
    )
}


interface Props {
    posts: Post[]
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