import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from 'components/list/PostList';
import { listPosts } from 'store/modules/list';


// import Pagination from 'components/list/Pagination';
// import { connect } from 'react-redux';
// import { bindActionCreators} from 'redux';

const ListContainer = ({location, match}) => {
    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({ list, loading, user }) => ({
            posts: list.posts,
            error: list.error,
            // loading: loading['posts/LIST_POSTS'],
            // user: user.user,
        }),
    );


    useEffect(()=>{
        const { username } = match.params;
        const {tag, page} = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });

        console.log('ListCon_effect',tag, username, page)
        dispatch(listPosts({ tag, username, page }));
    }, [location.search, match.params])

/* 
    getPostList = () => {
        // 페이지와 태그 값을 부모에서 받아온다.
        const { tag, page, ListAction } = this.props;
        ListAction.getPostList({
            page,
            tag
        });
    } */

    return (
        <PostList
            loaction={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />
    )
/* 
    componentDidMount() {
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState) {

        // 페이지/태그가 바뀔 때 리스트를 다시 불러온다.
        if(prevProps.page !== this.props.page || prevProps.tag !== this.props.tag) {
            this.getPostList();
            console.log('[ListContainer]_page', prevProps.page,this.props.page )
            console.log('[ListContainer]_tag', prevProps.tag,this.props.tag )
            
            // 스크롤바를 맨 위로 올립니다
            document.documentElement.scrollTop = 0;
        }
    }


    render() {
        const { loading, posts, page, lastPage, tag } = this.props;

        console.log(this.props)
        if(loading) return null;        // 로딩 중에는 아무것도 보여 주지 않습니다.
        return (
            <div>
                <PostList posts={posts}/>
                <Pagination page={page} lastPage={lastPage} tag={tag}/>
            </div>
        )
    } */
}
/* 
const mapStateToProp = (state) =>({
    loading: state.pender.pending['list/GET_POST_LIST'],
    posts: state.list.get('posts'),
    lastPage: state.list.get('lastPage'),
})

const mapDispatchToProp = (dispatch) => ({
    ListAction: bindActionCreators(listActions, dispatch)
}) 
*/

//export default connect( mapStateToProp,mapDispatchToProp)(ListContainer);
export default withRouter(ListContainer)