import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreviewPane from './PreviewPane';

class PreviewPaneContainer extends Component {
    render() {
        const { markdwon, titile } = this.props;

        return (
            <PreviewPane titile={titile} markdown={markdwon}/>
        );
    }
}

export default connect(
    (state) => ({
        titile: state.title,
        makrdown: state.markdown
    })
)(PreviewPaneContainer);