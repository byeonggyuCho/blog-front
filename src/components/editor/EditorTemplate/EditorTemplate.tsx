import React, { useState, useEffect } from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EditorTemplate = ({ header, editor, preview }) => {

    const [leftPercentage, setLeftPercentage] = useState(0.5)

    // separator 클릭 후 마우스를움직이면 그에 따라 leftPercentage 업데이터
    const handleMouseMove = (e) => {
        // this.setState({
        //     leftPercentage: e.clientX / window.innerWidth
        // });
        setLeftPercentage( e.clientX / window.innerWidth)
    }

    //마우스를 뗐을 때 등록한 이벤트 제거
    const handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }

    // separator 클릭할 때
    const handleSeparatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }


    // 각 영역에 flex값 적용
    const leftStyle = {
        flex: leftPercentage
    };
    const rightStyle = {
        flex: 1 - leftPercentage
    };

    // separator 위치 설정
    const separatorStyle = {
        left: `${leftPercentage * 100}%`
    };

    return (
        <div className={cx('editor-template')}>
            {header}
            <div className={cx('panes')}>
                <div className={cx('pane', 'editor')} style={leftStyle}>
                    {editor}
                </div>
                <div className={cx('pane', 'preview')} style={rightStyle}>
                    {preview}
                </div>
                <div
                    className={cx('separator')}
                    style={separatorStyle}
                    onMouseDown={handleSeparatorMouseDown}                    
                />
            </div>
        </div>
    );
}

export default EditorTemplate;