import React, { useEffect } from 'react';
import Footer from 'components/common/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

const FooterContainer = ({ BaseActions, logged }) => {
    const handleLoginClick = () => {
        if(logged) {
            try {
                BaseActions.logout();
                window.location.reload(); // 페이지 새로고침
            } catch(e) {
                console.error(e);
            }
            return;
        }
        BaseActions.showModal('login');
        BaseActions.initializeLoginModal();
    }

    return (
        <Footer onLoginClick={handleLoginClick} logged={logged}/>
    );
}

export default connect(
    (state) => {

        return {logged: state.base.get('logged')}
    },
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(FooterContainer);