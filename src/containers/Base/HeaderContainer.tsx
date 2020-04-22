import React from 'react';
import Header from 'components/base/Header';
import * as BaseActions from 'actions/base';
import * as UserActions from 'actions/user';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState  } from 'reducers'
import { useParams} from'react-router'
import { userInfo } from 'os';

const  HeaderContainer: React.FC = ({visible}) => {

    const dispatch = useDispatch();
    const params = useParams();
    const {logged,user} = useSelector(
        (state : RootState) =>({
            logged : state.base.logged
            user: state.user
        })
    )

    const handleRemove = () => {
        dispatch( BaseActions.showModal('remove'));
    }

    const handleLogout = async () => {
        try {
            UserActions.logout();
        } catch (e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href = '/'; // 홈페이지로 새로고침
    }

    if(!visible) return null;

    return (
        <Header
            postId={params.id}
            logged={logged}
            onRemove={handleRemove}
            onLogout={handleLogout}
            userName={user.loggedInfo.username}
        />
    );
}

export default (HeaderContainer)