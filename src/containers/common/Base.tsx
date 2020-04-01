
 import React, { useEffect } from 'react';
 import LoginModalContainer from 'containers/modal/LoginModalContainer';
 import { useDispatch} from 'react-redux';
 import * as baseActions from 'store/modules/base';
 
 /**
  * 페이지를 새로고침할 때마다 현재 유저가 로그인 중인지 검증하는 목적
  */
 const Base = () => {
    const dispatch = useDispatch();

    const initialize = () => {
         //로그인상태를 학인한다.

         // checkLogin의 응답을 기다리기 전에 로그인으로 간준한다.
         // 이는 임시적 단계를 넘기기 위한 방법이며 추후에 session의 저장값에 따라 로그인 비화성화 처리를 한다.
         if(localStorage.logged === "true") {
             dispatch(baseActions.tempLogin())
         }

         dispatch(baseActions.checkLogin.request())
    }

    useEffect(()=>{
        initialize();
    },[])


    return (
        <div>
            <LoginModalContainer/>
            {// 전역적으로 사용하는 컴포넌트들이 있으면 여기에 랜더링한다.
            }
        </div>
    )
}


export default (Base)