import React from 'react';
import styles from './ListWrapper.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListWrapper:React.FC = function (props) {
    
    const {children} = props

    return (
        <div className={cx('list-wrapper')}>
            {children}
        </div>
)};

export default ListWrapper;