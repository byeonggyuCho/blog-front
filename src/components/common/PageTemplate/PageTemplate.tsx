import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Headercontainer from 'containers/Base/HeaderContainer';
import FooterContainer from 'containers/Base/FooterContainer';

const cx = classNames.bind(styles);

interface PageTemplateInterface {
    children : React.FunctionComponent
}

const PageTemplate:React.FC = function (props : PageTemplateInterface) {
    
    const {children} = props

    return(
        <div className={cx('page-template')}>
            <Headercontainer/>
            <main>
                {children}
            </main>
            <FooterContainer/>
        </div>
)};

export default PageTemplate;