import React from 'react';
import EditorPane from 'components/editor/EditorPane';
import { connect, useSelector } from 'react-redux';
import  { RootState } from 'store/modules'
import { withRouter } from 'react-router-dom';


const EditorPaneContainer = ( ) => {

    const { title, tags, markdown,EditorActions } = useSelector( 
        (state: RootState) => ({
            title : state.editor.title,
            tags : state.editor.tags,
            markdown : state.editor.markdown,
            EditorActions : state.editor.EditorActions,
        })
    )



    const handleChangeInput = ({name, value}) => {
        EditorActions.changeInput({name, value});
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

export default withRouter(EditorPaneContainer);