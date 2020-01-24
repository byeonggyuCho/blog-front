import React, { Compnent } from 'react';
import { connect } from 'react-redux';
import PreviewPane from './PreviewPane';

class PreviewPaneContainer extends Compnent {
    render() {
        const { markdwon, titile } = this.props;

        return (
            <PreviewPane titile={titile} markdown={markdwon}/>
        );
    }
}

export default connect(
    (state) => ({
        titile: state.editor.get('title'),
        makrdown: state.editor.get('markdown')
    })
)(PreviewPaneContainer);