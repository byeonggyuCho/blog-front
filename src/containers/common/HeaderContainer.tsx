import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../actions/auth';
import {RootState} from '../../reducers'
import {Dispatch} from'redux'

const HeaderContainer = () => {
  const dispatch:Dispatch = useDispatch();
  const { auth } = useSelector(({ auth }:RootState) => ({ auth: auth.auth }));
  const onLogout = () => {
    dispatch(logout.request());
  };

  return <Header user={auth} onLogout={onLogout} />;
};

export default HeaderContainer;
