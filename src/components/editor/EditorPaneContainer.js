import React, { Component } from 'react';
import EditorPane from 'components/editor/EditorPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from '../../store/modules/editor'


class EditorPaneContainer extends Component {

    handleChangeInput = ({name, value}) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({name, vlaue});
    }

    render() {
        const { title, tags, markdown } = this.props;
        const { handleChangeInput } = this;

        return (
            <EditorPane
                title={title}
                markdown={markdwon}
                tags={tags}
                onChangeInput={handleChangeInput}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('titile'),
        markdown: state.editor.get('markdown'),
        tags= state.editor.get('tags')
    }),
    (dispatch) =>({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainer);