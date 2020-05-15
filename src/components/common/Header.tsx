import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import {User} from '../../models'
import palette from '../../lib/styles/palette'
import Hamburger from '../common/Hamburger'

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index:1;
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;
/* 

const HamburgerIcon = styled.div`
width: 20px;
height: 20px;
position: relative;
z-index: 4;
top: 30%;
cursor: pointer;

&::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${palette.gray[6]};

}

div {
    position: absolute;
    top: 13px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${palette.gray[6]};
}

&::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${palette.gray[6]};

}
`

const Hamburger = ()=>(
<HamburgerIcon>
  <div />
</HamburgerIcon>
)
 */

interface HeaderProps {
  user:User
  isMenuShow: boolean
  onLogout:()=>void
  onMenuShow:(v:boolean)=>void
}

const Header:React.FC<HeaderProps> = ({ user, onLogout,onMenuShow,isMenuShow }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            REACTERS
          </Link>
          {/* {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : ( */}
            <div className="right">
              {/* <Button to="/login">로그인</Button> */}
              {user &&  <UserInfo>{user.username}</UserInfo>}
              <Hamburger
                onShow={onMenuShow}
                show={isMenuShow}
              />
              
            </div>
          {/* )} */}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
