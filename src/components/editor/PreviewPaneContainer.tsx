import React from 'react';
import { connect } from 'react-redux';
import PreviewPane from './PreviewPane';

const  PreviewPaneContainer = ({ markdown,title } ) =>  {

        return (
            <PreviewPane titile={title} markdown={markdown}/>
        );
}

export default connect(
    (state) => ({
        title: state.editor.title,
        markdown: state.editor.markdown
    })
)(PreviewPaneContainer);