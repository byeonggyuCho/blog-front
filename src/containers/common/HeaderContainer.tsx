import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../actions/auth';
import {showMenu} from'../../actions/base'
import {RootState} from '../../reducers'
import {Dispatch} from'redux'

const HeaderContainer = () => {
  const dispatch:Dispatch = useDispatch();
  const { auth,slideShow } = useSelector(({ auth,base }:RootState) => ({ 
    auth: auth.auth,
    slideShow: base.showSlide
  }));

  // rgb(110, 130, 127)

  const onLogout = () => {
   dispatch(logout.request()); 
  };

  const onMenuShow = (v: boolean)=>{
    dispatch(showMenu(v));
  }

  return <Header user={auth} onLogout={onLogout} onMenuShow={onMenuShow} isMenuShow={slideShow}/>;
};

export default HeaderContainer;
