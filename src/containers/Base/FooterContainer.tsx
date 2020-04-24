import React from 'react';
import Footer from 'components/common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import * as baseActions from 'actions/base';
import {RootState} from 'reducers'

const FooterContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { logged } = useSelector( (state :RootState) =>({
        logged : state.base.logged
    }))
/* 
    const handleLoginClick = () => {
        if(logged) {
            try {
                dispatch(baseActions.logout.request());
                window.location.reload(); // 페이지 새로고침
            } catch(e) {
                console.error(e);
            }
            return;
        }
        dispatch(baseActions.showModal('login'))
        dispatch(baseActions.initializeLoginModal())
    } */

    return (
        <Footer/>
    );
}

export default (FooterContainer);