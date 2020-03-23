import React from 'react';
import Footer from 'components/common/Footer';
import { useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';
import base, * as baseActions from 'store/modules/base';
import {ReduxState} from 'store/modules'

const FooterContainer = () => {
    const dispatch = useDispatch();
    const { logged } = useSelector( (state :ReduxState) =>({
        logged : state.base.logged
    }))

    const handleLoginClick = () => {
        if(logged) {
            try {
                dispatch(baseActions.logout.request(null, null));
                window.location.reload(); // 페이지 새로고침
            } catch(e) {
                console.error(e);
            }
            return;
        }
        dispatch(baseActions.showModal<string>()('login'))
        dispatch(baseActions.initializeLoginModal()())
    }

    return (
        <Footer onLoginClick={handleLoginClick} logged={logged}/>
    );
}

export default (FooterContainer);