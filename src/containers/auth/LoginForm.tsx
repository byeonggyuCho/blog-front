import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from '../../actions/auth';
import AuthForm from '../../components/auth/AuthForm';
import {RootState} from '../../reducers'
import {Dispatch} from 'redux'
// import { check } from '../../actions/user';
// import {useHistory } from 'react-router-dom'
// import storage from '../../lib/storage'

const LoginForm:React.FC = () => {

  // const history  = useHistory()
  const [error, setError] = useState<string>(null);
  const dispatch:Dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }:RootState) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    // user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e:React.ChangeEvent<HTMLInputElement> )=> {

    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };


  
  // 폼 등록 이벤트 핸들러
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login.request({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      return;
    }
    // if (auth) {
    //   console.log('로그인 성공');
    //   dispatch(check.request());
    // }
  }, [auth, authError, dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     // history.push('/');
  //     try {

  //       // @ts-ignore
  //       storage.set('user', JSON.stringify(user));
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [history, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm
