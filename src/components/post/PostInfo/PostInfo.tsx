import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import moment from 'moment';
import { string } from 'prop-types';

const cx = classNames.bind(styles);

interface PostInfoProp {
    publishedDate : string
    title : string
    tags : string []
}

const PostInfo: React.FC<PostInfoProp> = (props) => {
    
    const {publishedDate, title, tags} = props
    
    return (
        <div className={cx('post-info')}>
            <div className={cx('info')}>
                <h1>{title}</h1>
                <div className={cx('tags')}>
                    {
                        // tags가 존재할 때만 map을 실행한다.
                        tags && tags.map(
                            tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
                        )
                    }
                </div>
                <div className={cx('date')}>{moment(publishedDate).format('ll')}</div>
            </div>
        </div>
)};

export default PostInfo;