import React from 'react';
import EditorTemplate from '../components/editor/EditorTemplate'
import EditorHeader from '../components/editor/EditorHeader'

const EditorPage = () => {
    return (
        <div>
            <EditorTemplate
                header={<EditorHeader/>}
                editor="에디더"
                preview="프리뷰"
            />
        </div>
    );
};

export default EditorPage;