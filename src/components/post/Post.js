import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import {  bindActionCreators } from 'redux';


class Post extends Component {
    initialize = async () => {
        const { PostActions, id } = this.props;
        try {
            await PostActions.getPost(id);
        } catch(e) {
            console.log(e);
        }
    }


    componentDidMount() {
        this.initialize();
    }

    render() {
        const { loading, post ,title,tgas ,publishedDate} = this.props;

        if(loading) return null;    // 로딩 중일 때는 아무것도 보여주지 않음.

        return (
            <div>
                <PostInfo title={title} publishedDate={publishedDate} tags={tgas}/>
                <PostBody body={post}/>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        post: state.post.get('post'),
        loading: state.pender.pending['post/GET_POST']  // 로딩실패
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(Post);