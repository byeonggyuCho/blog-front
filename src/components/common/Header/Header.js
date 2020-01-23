import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button'

const cx = classNames.bind(styles);

const Header = () => (
    <header className={cx('header')}>
        <div className={cx('header-content')}>
            <div className={'brand'}>
                <Link to="/">reactblog</Link>
            </div>
            <div className={cx('right')}>
                {/*조건에 따라 버튼 렌더링*/}
                <Button theme="outline" to="/editor"> 새 포스트 </Button>
            </div>
        </div>
    </header>
)

export default Header;