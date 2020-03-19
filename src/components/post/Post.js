import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import {  bindActionCreators } from 'redux';


class Post extends Component {
    initialize = () => {
        const { PostActions, id } = this.props;
        try {
            PostActions.getPost(id);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        const { loading, body ,title,tags ,publishedDate} = this.props;

        if(loading) return null;    // 로딩 중일 때는 아무것도 보여주지 않음.

        return (
            <div>
                <PostInfo title={title} publishedDate={publishedDate} tags={tags}/>
                <PostBody body={body}/>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        loading: state.loading['post/GET_POST'],
        title: state.post.title,
        tags: state.post.tags,
        body: state.post.body,
        publishedDate: state.post.publishedDate,
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(Post);