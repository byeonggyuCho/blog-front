import React,{useEffect} from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import * as authActions from 'actions/auth'
import {useDispatch, useSelector } from 'react-redux'
import {Dispatch} from 'redux'
import {RootState} from 'reducers'

const Login:React.FC = function () {


    const dispatch:Dispatch = useDispatch();

    const {form,result,error} = useSelector((state:RootState)=>{
        return {
            form : state.auth.login.form,
            error : state.auth.login.error,
            result : state.auth.result,
        }
    })


    useEffect(()=>{

        return ()=>dispatch(authActions.initializeForm('login'))
    },[])

    const handleChange = (e)=>{
        const { name, value } = e.target;

        dispatch(authActions.changeInput({
            name,
            value,
            form: 'login'
        }))
    }

    const handleLogin = () => {
        const { email, password } = form
        const loggedInfo = result

        try {
            dispatch(authActions.login({email, password}))
            
            dispatch(authActions.setLoggedInfo(loggedInfo))

            history.push('/');
            storage.set('loggedInfo', loggedInfo);

        } catch (e) {
            console.log('a');
            this.setError('잘못된 계정정보입니다.');
        }
    }

    const  setError = (message) => {

        dispatch(authActions.setError({
            form: 'login',
            message
        }))
    }
        return false;
    }



    return (
        <AuthContent title="로그인">
            <InputWithLabel 
                label="이메일" 
                name="email" 
                placeholder="이메일" 
                value={email} 
                onChange={handleChange}
            />
            <InputWithLabel 
                label="비밀번호" 
                name="password" 
                placeholder="비밀번호" 
                type="password" 
                value={password} 
                onChange={handleChange}
            />
            {
                error && <AuthError>{error}</AuthError>
            }
            <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
            <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
        </AuthContent>
    );
}
export default Login;