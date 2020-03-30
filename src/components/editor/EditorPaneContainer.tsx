import React from 'react';
import EditorPane from 'components/editor/EditorPane';
import { useDispatch, useSelector } from 'react-redux';
import  { RootState } from 'store/modules'
import * as editorActoins from 'store/modules/editor'


const EditorPaneContainer = ( ) => {

    const dispatch = useDispatch();
    const { title, tags, markdown } = useSelector( 
        (state: RootState) => ({
            title : state.editor.title,
            tags : state.editor.tags,
            markdown : state.editor.markdown
        })
    )



    const handleChangeInput = ({name, value}) => {
        dispatch( editorActoins.changeInput({name, value}))
    }
    return (
        <EditorPane
            title={title}
            markdown={markdown}
            tags={tags}
            onChangeInput={handleChangeInput}
        />
    );
}

export default EditorPaneContainer