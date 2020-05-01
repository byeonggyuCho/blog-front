import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../actions/user';
import {RootState} from '../../reducers'
import {Dispatch} from'redux'

const HeaderContainer = () => {
  const dispatch:Dispatch = useDispatch();
  const { user } = useSelector(({ user }:RootState) => ({ user: user.user }));
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
