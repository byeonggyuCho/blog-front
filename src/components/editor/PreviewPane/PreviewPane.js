import React from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';
import MarkdwonRender from '../../common/MarkdownRender'

const cx = classNames.bind(styles);

const PreviewPane = ({markdown, title}) => (
    <div className={cx('preview-pane')}>
        <h1 className={cx('titile')}>
            {titile}
        </h1>
        <div>
            <MarkdwonRender markdown={markdown}/>
        </div>
    </div>
)

export default PreviewPane;