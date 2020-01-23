import React from 'react';
import styles from './Paginatoin.scss';
import classNames from 'classnames/bind';
import Buton from '../../common/Button';

const cx = classNames.bind(styles);

const Paginatoin = () => (
    <div classname={cx('pagination')}>
        <Button disabled>
            이전 페이지
        </Button>

        <div className={cx('number')}>
            페이지 1
        </div>
        <Button>
            다음 페이지
        </Button>
    </div>
);

export default Paginatoin;