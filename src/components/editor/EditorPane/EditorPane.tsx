import React, {  useEffect } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';
import CodeMirror from 'codemirror';

//마크다운 내부에 들어가느 코드 색상.
import 'codemirror/mode/markdown/markdown'; //마크다운 문법 색상.
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

//라이프라이클 메서드와 커스텀 메서드를 사용해야한다.
// CodeMirror라이브러리를 연동해야한다.

interface EditorPaneProps {
    tags : string
    title : string
    markdown: string
    onChangeInput : (e)=>void
}


const EditorPane:React.FC<EditorPaneProps> = (props) =>  {

    const { tags = '', title = '' ,markdown, onChangeInput} = props

    // 초기화를 클린업에 해준다.
    let editor = null;  //에디터 ref
    let codeMirror =  null;
    let cursor = null


    const handleChange = (e) => {
        // const { onChangeInput } = this.props;
        onChangeInput(e.target); 
    }


    useEffect(()=>{

        // for detaile... 
        // https://codemirror.net/doc/manual.html#config
        codeMirror = CodeMirror(editor, {
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true, // 왼쪽에 라인넘버 표시여부
            lineWrapping: true // 개행 여부  
        });

        codeMirror.on('change', (doc) => {
            cursor = doc.getCursor();// 텍스트 커서 위치 저장.
    
            onChangeInput({
                name : 'markdown',
                value: doc.getValue()
            })
        })
        codeMirror.setSize(null, 500);
    },[ ])



    useEffect(()=>{
         // markdown이 변경되면 에디터 값도 변경합니다.
        // 이 과정에서 텍스트 커서의 위치가 초기화 되기 때문에 저장한 커서의 위치가 있으면 해당 위치로 설정하빈다.
        if(!codeMirror) return; //인스턴스가 생성되지 않았을 때
        codeMirror.setValue(markdown);
        if(!cursor) return; // 커서가 없을때
        codeMirror.setCursor(cursor);
    },[markdown, codeMirror, cursor])
/* 
    componentDidUpdate(prevProps, prevState) {
        // markdown이 변경되면 에디터 값도 변경합니다.
        // 이 과정에서 텍스트 커서의 위치가 초기화 되기 때문에 저장한 커서의 위치가 있으면 해당 위치로 설정하빈다.


        if(prevProps.markdown !== this.props.markdown) {
            const { codeMirror, cursor } = this;
            if(!codeMirror) return; //인스턴스가 생성되지 않았을 때
            codeMirror.setValue(this.props.markdown);
            if(!cursor) return; // 커서가 없을때
            codeMirror.setCursor(cursor);
        }
    } */


    return (
        <div className={cx('editor-pane')}>
            <input 
                className={cx('title')} 
                placeholder="Title" 
                name="title"
                value={title}
                onChange={handleChange}
            />
            <div className={cx('code-editor')} ref={ref => editor=ref }/>

            <div className={cx('tags')}>
                <div className={cx('description')}>TAG</div>
                <input 
                    name="tags" 
                    placeholder="태그를 입력하세요 (쉼표로 구분)"
                    value={tags}
                    onChange={handleChange}
                    />
            </div>
        </div> 
    )
}

export default EditorPane;