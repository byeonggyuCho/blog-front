import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Headercontainer from '@/containers/common/Headercontainer';
import FooterContainer from '@/containers/common/FooterContainer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
    <div className={cx('page-template')}>
        <Headercontainer/>
        <main>
            {children}
        </main>
        <FooterContainer/>
    </div>
);

export default PageTemplate;