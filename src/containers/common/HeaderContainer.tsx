import React from 'react';
import Header from 'containers/Base/node_modules/components/common/Header';
import * as BaseActions from 'actions/base';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState  } from 'reducers'
import { useParams} from'containers/Base/node_modules/react-router'

const  HeaderContainer: React.FC = () => {

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