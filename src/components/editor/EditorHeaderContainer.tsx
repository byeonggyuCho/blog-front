import React, { useState, useEffect} from 'react';
import EditorHeader from './EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import * as editorActions from 'store/modules/editor';
import {ReduxState} from 'store/modules'

type PropsState = ReturnType<typeof mapStateToProps>
type PropsDispatch = ReturnType<typeof mapDispatchToProps>

interface Props extends PropsState, PropsDispatch {
    postId: string,
    history: any,
    location: any
}

const  EditorHeaderContainer : React.FunctionComponent<Props>
= ({ postId, title, markdown, tags = '',history ,EditorActions, location}) => {

    useEffect(() => {
        EditorActions.initialize(); // 에디터를 초기화

        // 쿼리 파싱
        const { id } = queryString.parse(location.search);
        if(id) {
            // id가 존재하면 포스트 불러오기
            EditorActions.getPost(id);
        }
    },[])


    const handleGoBack = () => {
       history.goBack();
    }

    const handleSubmit = async () => {

        const post = {
            title,
            body: markdown,

            // 태그 텍스트를 ,로 분리시키고 앞뒤 공백을 지운 후 중복되는 값을 제거한다.
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        };

        try {
            // id가 존재하면 editPost 호출
            const { id } = queryString.parse(location.search);
            if(id) {
                await EditorActions.editPost({id, ...post});
                history.push(`/post/${id}`);
                return;
            }
            await EditorActions.writePost(post);
            // 페이지를 이동시킨다.posti는 위쪽에서 레퍼런스를 만들지 않고 이 자리에서 this.props.postId를 조회해야한다.
            // 현재값을 불러오기 위해서
            history.push(`/post/${postId}`);
        } catch(e) {
            console.error(e);
        }
    }

    const { id } = queryString.parse(location.search);
    return (
        <EditorHeader
            onGoBack={handleGoBack}
            onSubmit={handleSubmit}
            isEdit={id ? true : false}
        />
    );
}

export const mapStateToProps =  (state: ReduxState) => ({
    title: state.editor.title,
    markdown: state.editor.markdown,
    tags: state.editor.tags,
    postid: state.editor.postId
})
export const mapDispatchToProps =  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EditorHeaderContainer))