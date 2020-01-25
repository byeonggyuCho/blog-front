import React from 'react';
import styles from './Paginatoin.scss';
import classNames from 'classnames/bind';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

const Paginatoin = ({page, lastPage, tag}) => {
    
    const createpagePath = (page) => {
        return tag ? `/tag/${tag}/${page}` : `/page/${page}`;
    }

    return (
        <div classname={cx('pagination')}>
            <Button disable={page === 1} to={createpagePath(page - 1)}>
                이전 페이지
            </Button>
            <div className={cx('number')}>
                페이지 {page}
            </div>
            <Button disabled={page === lastPage} to={createpagePath(page + 1)}>
                다음 페이지
            </Button>
        </div>
    );
};

export default Paginatoin;