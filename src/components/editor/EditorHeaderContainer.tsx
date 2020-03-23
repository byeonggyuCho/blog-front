import React, {  useEffect} from 'react';
import EditorHeader from './EditorHeader';
import {  useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import * as editorActions from 'store/modules/editor';
import {ReduxState} from 'store/modules'


interface Props  {
    history: any,
    location: any
}

const  EditorHeaderContainer : React.FunctionComponent<Props>
= ({  history , location}) => {

    const dispatch = useDispatch();

    let {postId, title, markdown, tags } = useSelector(
        (state: ReduxState) => ({
            title: state.editor.title,
            markdown: state.editor.markdown,
            tags: state.editor.tags,
            postId: state.editor.postId
        })
    )

    useEffect(() => {
        // 에디터를 초기화
        dispatch(editorActions.initialize());

        // 쿼리 파싱
        const { id } = queryString.parse(location.search);
        if(id) {
            // id가 존재하면 포스트 불러오기
            dispatch(editorActions.getPost.request(id));
        }
    },[])


    const handleGoBack = () => {
       history.goBack();
    }

    const handleSubmit = () => {

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
                dispatch(editorActions.editPost.request({id, ...post}));
                history.push(`/post/${id}`);
                return;
            }
            dispatch(editorActions.writePost.request(post));
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

export default withRouter(EditorHeaderContainer)