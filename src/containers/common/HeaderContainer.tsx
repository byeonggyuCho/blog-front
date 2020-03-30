import React from 'react';
import Header from 'components/common/Header';
import * as BaseActions from 'store/modules/base';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState  } from "store/modules";
import { useParams} from'react-router'

const  HeaderContainer = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const {logged} = useSelector(
        (state : RootState) =>({
            logged : state.base.logged
        })
    )

    // 이게 맞는지...
    const handleRemove = () => {
        dispatch( BaseActions.showModal('remove'));
    }

    return (
        <Header
            postId={params.id}
            logged={logged}
            onRemove={handleRemove}
        />
    );
}

export default (HeaderContainer)