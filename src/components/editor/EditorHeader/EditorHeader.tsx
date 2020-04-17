import React from 'react';
import styles from './EditorHeader.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
// import Button from '../../../components/common/Button';

const cx = classNames.bind(styles);
interface EditorHeaderInterface {
    onGoBack: ()=>void
    onSubmit: ()=>void
    isEdit: boolean
}


const EditorHeader:React.FC<EditorHeaderInterface> = (props) => {

    const {onGoBack, onSubmit, isEdit} = props
    
    return (
        <div className={cx('editor-header')}>
            <div className={cx('back')}>
                <Button onClick={onGoBack} theme="outline">뒤로가기</Button>
            </div> 
            <div className={cx('submit')}>
                <Button onClick={onSubmit} theme="outline">{isEdit ? '수정' : '작성'}하기</Button>
            </div>
        </div>
    );
};

export default EditorHeader;