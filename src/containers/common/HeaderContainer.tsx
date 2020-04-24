import React from 'react';
import Header from 'components/base/Header';
import * as BaseActions from 'actions/base';
import * as UserActions from 'actions/user';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState  } from 'reducers'
import { useParams} from'react-router'

const  HeaderContainer: React.FC = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const {logged,user,visible} = useSelector(
        (state : RootState) =>({
            logged : state.base.logged,
            user: state.user,
            visible: state.base.header.visible
        })
    )

    const handleLogout = () => {
        dispatch(UserActions.logout.requst())
        // storage.remove('loggedInfo');
        // window.location.href = '/'; // 홈페이지로 새로고침
    }

    // const handleRemove = () => {
    //     dispatch( BaseActions.showModal('remove'));
    // }

    if(!visible) return null;



    return (
        <Header
            postId={params.id}
            logged={logged}
            user={user}
            onLogout={handleLogout}
            // onRemove={handleRemove}
        />
    );
}

export default (HeaderContainer)