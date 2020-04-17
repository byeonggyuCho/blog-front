import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

interface PaginationProps {
    page : number,
    lastPage: number,
    tag: string
}

const Pagination = (props: PaginationProps) => {

    const {page, lastPage, tag} = props
    
    const createpagePath = (page) => {
        return tag 
            ? `/tag/${tag}/${page}` 
            : `/page/${page}`;
    }
    return (
        <div className={cx('pagination')}>
            <Button disabled={page === 1} to={createpagePath(page - 1)}>
                Prev
            </Button>
            <div className={cx('number')}>
                페이지 {page}
            </div>
            <Button disabled={page === lastPage} to={createpagePath(page + 1)}>
                Next
            </Button>
        </div>
    );
};

export default Pagination;