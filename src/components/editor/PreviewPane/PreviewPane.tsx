import React from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';
import MarkdwonRender from '../../common/MarkdownRender'

const cx = classNames.bind(styles);

interface PreviewPaneProps {
    markdown : string
    title : string 
}

const PreviewPane:React.FC<PreviewPaneProps> = function (props) { 
    
    
    const {markdown, title} = props 


    return(
        <div className={cx('preview-pane')}>
                <h1 className={cx('title')}>
                    {title}
                </h1>
                <div>
                    <MarkdwonRender markdown={markdown}/>
                </div>
            </div>
)}

export default PreviewPane;