import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button'
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtil';
import LoginButton from 'components/Base/LoginButton'

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled(Link)`
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;


const cx = classNames.bind(styles);

interface HeaderInterface {
    postId: string
    logged: boolean
    userName? : string
    onRemove: () => void
    onLogout: ()=>void
}


const Header = function(props: HeaderInterface) {

    const {postId, onRemove, logged,onLogout,userName} = props

    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Logo  to="/">HEURM</Logo>
                    <Spacer/>
                    logged ?
                        <div className={cx('right')}>
                            {
                                // 조건에 따라 버튼 렌더링
                                // flex를 유지하려고 배열 형태로 랜더링합니다.
                                postId && 
                                [
                                    <Button key="edit" theme="outline" to={`/editor?id=${postId}`}>수정</Button>,
                                    <Button key="remove" theme="outline" onClick={onRemove}>삭제</Button>
                                ]
                            }
                            <Button theme="outline" to="/editor">새 포스트</Button>
                      </div>
                    : <LoginButton/> 
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>
        </Positioner>

        // <header className={cx('header')}>
        //     <div className={cx('header-content')}>
        //         <div className={'brand'}>
        //             <Link to="/">devlog</Link>
        //         </div>
        //         { 
        //             logged && 
        //             <div className={cx('right')}>
        //                 {
        //                     // 조건에 따라 버튼 렌더링
        //                     // flex를 유지하려고 배열 형태로 랜더링합니다.
        //                     postId && 
        //                     [
        //                         <Button key="edit" theme="outline" to={`/editor?id=${postId}`}>수정</Button>,
        //                         <Button key="remove" theme="outline" onClick={onRemove}>삭제</Button>
        //                     ]
        //                 }
        //                 <Button theme="outline" to="/editor">새 포스트</Button>
        //             </div>
        //         }
        //     </div>
        // </header>
)}

export default Header;