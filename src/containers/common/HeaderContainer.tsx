import React, { useEffect } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import * as BaseActions from 'store/modules/base';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState  } from "store/modules";


const  HeaderContainer = ({ match }) => {

    const dispatch = useDispatch();
    const {logged} = useSelector(
        (state : RootState) =>({
            logged : state.base.logged
        })
    )


    // 이게 맞는지...
    const handleRemove = () => {
        dispatch( BaseActions.showModal('remove'));
    }

    const { id } = match.params;

    return (
        <Header
            postId={id}
            logged={logged}
            onRemove={handleRemove}
        />
    );
}

export default withRouter(HeaderContainer)