import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';
import { connect,useDispatch,useSelector } from 'react-redux';
import { Dispatch} from 'redux';
import * as authActions from 'actions/auth'
import {isEmail, isLength, isAlphanumeric} from 'validator';
import auth from 'reducers/auth';
import {RootState} from 'reducers'
import debounce from 'lodash/debounce';
import {useHistory} from 'react-router'



const  Register:React.FC  = function(props) {

    const dispatch:Dispatch = useDispatch();
    const history = useHistory();

    const  {form, error,result,exists } = useSelector((state:RootState=>{
        return {
            form : state.auth.register.from,
            error : state.auth.register.error,
            exists : state.auth.register.exists
            result : state.auth.result
        }
    })


    useEffect(()=>{
        return ()=>dispatch(authActions.initializeForm('register'))
    },[]) 


    const  setError = (message) => {
        const { AuthActions } = props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    const  validate = {
        email: (value) => {
            if(!isEmail(value)) {
                setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        username: (value) => {
            if(!isAlphanumeric(value) || !isLength(value, { min:4, max: 15 })) {
                setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordConfirm: (value) => {
            if(props.form.get('password') !== value) {
                setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            setError(null); 
            return true;
        }
    }



    const handleChange = (e) => {
        const { name, value } = e.target;


        dispatch(authActions.changeInput({
            name,
            value,
            form: 'register'
        }))


        // 검증작업 진행
        const validation = validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

        // TODO: 이메일, 아이디 중복 확인
        const check = name === 'email' ? checkEmailExists : checkUsernameExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        check(value);
    }


    const checkUsernameExists =  debounce((username) => {
        try {
            dispatch(authActions.checkUsernameExists(username));
            if(exists.get('username')) {
                setError('이미 존재하는 아이디입니다.');
            } else {
                setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    })




    const    checkEmailExists =  debounce((email) => {
        try {
             dispatch(authActions.checkEmailExists(email));
            if(exists['email']) {
                setError('이미 존재하는 이메일입니다.');
            } else {
                setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    })


    const  handleLocalRegister =  () => {
        const { email, username, password, passwordConfirm } = form.toJS();

        const { validate } = this;

        if(error) return; // 현재 에러가 있는 상태라면 진행하지 않음
        if(!validate['email'](email) 
            || !validate['username'](username) 
            || !validate['password'](password) 
            || !validate['passwordConfirm'](passwordConfirm)) { 
            // 하나라도 실패하면 진행하지 않음
            return;
        }

        try {
            
            dispatch(authActions.localRegister({
                email, username, password
            })

            // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
            history.push('/'); // 회원가입 성공시 홈페이지로 이동
        } catch(e) {
            // 에러 처리하기
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                return this.setError(message);
            }
            this.setError('알 수 없는 에러가 발생했습니다.')
        }
    }    


    return (
        <AuthContent title="회원가입">
            <InputWithLabel label="이메일" name="email" placeholder="이메일"/>
            <InputWithLabel label="아이디" name="username" placeholder="아이디"/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
            <InputWithLabel 
                    label="비밀번호 확인" 
                    name="passwordConfirm" 
                    placeholder="비밀번호 확인" 
                    type="password" 
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
        </AuthContent>
    );
}

export default Register;