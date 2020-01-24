import React from 'react';
import EditorTemplate from '../components/editor/EditorTemplate'
import EditorHeader from '../components/editor/EditorHeader'
import EditorPaneContainer from '../components/editor/EditorPaneContainer'
import PreviewPaneContainer from '../components/editor/PreviewPaneContainer'

const EditorPage = () => {

    return (
        <EditorTemplate
            header={<EditorHeader/>}
            editor={<EditorPaneContainer/>}
            preview={<PreviewPaneContainer/>}
        />
    );
};

export default EditorPage;