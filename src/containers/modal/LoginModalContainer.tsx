import React from 'react';
import LoginModal from 'components/modal/LoginModal';
import { useSelector, useDispatch } from 'react-redux';
import * as baseActions from 'actions/base';
import  {RootState} from 'reducers'

const LoginModalContainer = () => {

    const dispatch = useDispatch();
    const {visible, password, error} = useSelector( 
        (state: RootState) => ({
            visible: state.base.modal.login,
            password: state.base.loginModal.password,
            error: state.base.loginModal.error
        })
    )

    const handleLogin = () => {
        try {
            // 로그인 시도, 성꽁하면 모달 닫기
            dispatch(baseActions.login.request(password))
            dispatch(baseActions.hideModal('login'))
            localStorage.logged = "true";
        } catch(e) {
            console.log(e);
        }
    }

    // x버튼
    const handleCancel = () => {
        dispatch(baseActions.hideModal('login'))
    }
    const handleChange = (e) => {
        const { value } = e.target;
        dispatch(baseActions.changePasswordInput(value))
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