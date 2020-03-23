import React, { useEffect } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { useSelector, useDispatch} from 'react-redux';
import { ReduxState} from 'store/modules'


interface Prop {
    id : string
}

const Post : React.FunctionComponent<Prop>= ({id})=> {

    const dispatch = useDispatch();
    const {loading, title, tags, body, publishedDate } = useSelector(
        (state: ReduxState)=>({
            loading: state.loading['post/GET_POST'],
            title: state.post.title,
            tags: state.post.tags,
            body: state.post.body,
            publishedDate: state.post.publishedDate,
        })
    )



    const initialize = () => {
        try {
            dispatch( postActions.getPost.request(id))
           
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        initialize();
    },[])


    // const { loading, body ,title,tags ,publishedDate} = this.props;

    if(loading) return null;    // 로딩 중일 때는 아무것도 보여주지 않음.

    return (
        <div>
            <PostInfo title={title} publishedDate={publishedDate} tags={tags}/>
            <PostBody body={body}/>
        </div>
    )
}

export default Post

// connect(
//     (state) => ({
//         loading: state.loading['post/GET_POST'],
//         title: state.post.title,
//         tags: state.post.tags,
//         body: state.post.body,
//         publishedDate: state.post.publishedDate,
//     }),
//     (dispatch) => ({
//         PostActions: bindActionCreators(postActions, dispatch)
//     })
// )(Post);