import React, { useRef, useEffect } from 'react';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

interface EditorProps {
  title: string
  body: string
  onChangeField: (data:any)=>void
}

const EditorBlock = styled(Responsive)`
 // /*이지 위 아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 5rem;
  width: 100%;
`;
const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;
const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;



const EditorPane:React.FC<EditorProps> = ({ title, body, onChangeField })=> {
  const editorRef = useRef(null);

  const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>): void => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeHandler = (e)=>{
    onChangeField({key:'body',value:editorRef.current.getInstance().getMarkdown()})
  }

    return (
      <>
       
        <EditorBlock>
        <TitleInput
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          value={title}
        />
        <QuillWrapper>
          <Editor
            events={{
              change: onChangeHandler
            }}
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            initialValue={body}
            ref={editorRef}
            hideModeSwitch={true}
          />
          </QuillWrapper>
        </EditorBlock>
      </>
    );
}

export default EditorPane;