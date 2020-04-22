import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux'
import * as baseActions from 'actions/base';
import { AuthWrapper } from 'components/Auth';
import { Route } from 'react-router-dom';

const  Auth:React.FC = function() {

    const dispatch:Dispatch = useDispatch();

    // 페이지에 진입 할 때 헤더를 비활성화
    useEffect(()=>{

        dispatch(baseActions.setHeaderVisibility(false)

        return  ()=>{
            dispatch(baseActions.setHeaderVisibility(true)
        }       
    },[])


    // componentWillMount() {
    //     this.props.BaseActions.setHeaderVisibility(false);
    // }

    // // 페이지에서 벗어 날 때 다시 활성화
    // componentWillUnmount() {
    //     this.props.BaseActions.setHeaderVisibility(true);
    // }

    return (
        <AuthWrapper>
            <Route path="/auth/login" component={Login}/>
            <Route path="/auth/register" component={Register}/>
        </AuthWrapper>
    );
}


export default Auth;

// export default connect(
//     (state) => ({

//     }),
//     (dispatch) => ({
//         BaseActions: bindActionCreators(baseActions, dispatch)
//     })
// )(Auth);