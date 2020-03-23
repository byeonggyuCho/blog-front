import React from 'react';
import LoginModal from 'components/modal/LoginModal';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import  {ReduxState} from 'store/modules'

const LoginModalContainer = () => {

    const dispatch = useDispatch();
    const {visible, password, error} = useSelector( 
        (state: ReduxState) => ({
            visible: state.base.modal.login,
            password: state.base.loginModal.password,
            error: state.base.loginModal.error
        })
    )


    const handleLogin = async() => {
        try {
            // 로그인 시도, 성고하면 모달 닫기
            dispatch(baseActions.login.request(password))
            dispatch(baseActions.hideModal<string>()('login'))

            localStorage.logged = "true";
        } catch(e) {
            console.log(e);
        }
    }
    const handleCancel = () => {

        dispatch(baseActions.hideModal<string>()('login'))
    }
    const handleChange = (e) => {
        const { value } = e.target;
        dispatch(baseActions.changePasswordInput<any>()(value))
    }
    const handleKeyPress = (e) => {
        // 인터 키를 누르면 로그인 호출
        if(e.key === 'Enter') {
            handleLogin();
        }
    }


    return (
        <LoginModal
            onLogin={handleLogin} onCancel={handleCancel} onChange={handleChange} onKeyPress={handleKeyPress}
            visible={visible} error={error} password={password}
        />
    );
}

export default (LoginModalContainer);