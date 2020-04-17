import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender'

const cx = classNames.bind(styles);


interface PostBody {
    body : string
}


const PostBody = ({body}:PostBody) => (
    <div className={cx('post-body')}>
        <div className={cx('paper')}>
            <MarkdownRender markdown={body}/>
        </div>
    </div>
);

export default PostBody;