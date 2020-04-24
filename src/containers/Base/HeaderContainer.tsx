import React from 'react';
import Header from 'components/base/Header';
import * as BaseActions from 'actions/base';
import * as UserActions from 'actions/user';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState  } from 'reducers'
import { useParams} from'react-router'
import { userInfo } from 'os';
import storage from 'lib/storage'




const  HeaderContainer: React.FC = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const {logged,user} = useSelector(
        (state : RootState) =>({
            logged : state.base.logged,
            user: state.user,
        })
    )

    const handleLogout = () => {
        try {
            dispatch(UserActions.logout.request());
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <Header
            postId={params.id}
            logged={logged}
            user={user}
            onLogout={handleLogout}
        />
    );
}

export default (HeaderContainer)