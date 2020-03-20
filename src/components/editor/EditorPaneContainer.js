import React from 'react';
import EditorPane from 'components/editor/EditorPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from 'store/modules/editor'


const EditorPaneContainer = ({ title= '', tags= '', markdown = '',EditorActions } ) => {

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

export default connect(
    (state) => ({
        title: state.editor.title,
        markdown: state.editor.markdown,
        tags: state.editor.tags,
    }),
    (dispatch) =>({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainer);