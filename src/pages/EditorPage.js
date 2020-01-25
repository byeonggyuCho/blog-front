import React from 'react';
import EditorTemplate from '../components/editor/EditorTemplate'
import EditorHeaderContainer from '../components/editor/EditorHeaderContainer'
import EditorPaneContainer from '../components/editor/EditorPaneContainer'
import PreviewPaneContainer from '../components/editor/PreviewPaneContainer'

const EditorPage = () => {

    return (
        <EditorTemplate
            header={<EditorHeaderContainer/>}
            editor={<EditorPaneContainer/>}
            preview={<PreviewPaneContainer/>}
        />
    );
};

export default EditorPage;