import React from 'react';
import styles from 'components/common/Footer/Footer.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);


const Footer = ({onLoginClick, logged}) => (
    <footer className={cx('footer')}>
        <Link to="/" className={cx('brand')}>Byueongyu Cho</Link>
        <div onClick={onLoginClick} className={cx('admin-login')}>
            {logged ? '로그아웃' : '관리자 로그인'} 
        </div>
    </footer>
);

export default Footer;