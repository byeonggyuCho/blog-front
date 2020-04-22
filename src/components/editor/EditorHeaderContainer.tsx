import React, {  useEffect} from 'react';
import EditorHeader from './EditorHeader';
import {  useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory} from 'containers/Base/node_modules/react-router'
import queryString from 'query-string';
import * as editorActions from 'actions/editor';
import {RootState} from 'reducers'


// interface Props  {
//     history: any,
//     location: any
// }

const  EditorHeaderContainer : React.FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { id } = queryString.parse(location.search);
    let { title, markdown, tags } = useSelector(
        (state: RootState) => ({
            title: state.editor.title,
            markdown: state.editor.markdown,
            tags: state.editor.tags,
            //postId: state.editor.postId
        })
    )

    useEffect(() => {
        if(id) {
            // id가 존재하면 포스트 불러오기
            dispatch(editorActions.getPost.request(id));
        }

        return () => dispatch(editorActions.initialize());
    },[id])


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
            const { id } = queryString.parse(location.search);
            if(id) {
                // id가 존재하면 editPost 호출
                dispatch(editorActions.editPost.request({id, ...post}));
                history.push(`/post/${id}`);
                return;
            }
            dispatch(editorActions.writePost.request(post));

            console.log('[EditorHeaderContainer] after writePost' )

            // post 작성이 비동기로 이뤄지는데 어떻게 여기서 postId를 얻어옴???
            // 사가에서 처리하는게 맞는듯..
            // connected-redux-router
            // 현재값을 불러오기 위해서 페이지를 이동시킨다.postId는 위쪽에서 레퍼런스를 만들지 않고 이 자리에서 this.props.postId를 조회해야한다.
            // history.push(`/post/${postId}`);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <EditorHeader
            onGoBack={handleGoBack}
            onSubmit={handleSubmit}
            isEdit={id ? true : false}
        />
    );
}

export default EditorHeaderContainer