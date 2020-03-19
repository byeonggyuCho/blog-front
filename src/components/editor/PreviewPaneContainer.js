import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreviewPane from './PreviewPane';

class PreviewPaneContainer extends Component {
    render() {
        const { markdown,title } = this.props;
        console.log('PRE',markdown, title)

        return (
            <PreviewPane titile={title} markdown={markdown}/>
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.title,
        markdown: state.editor.markdown
    })
)(PreviewPaneContainer);