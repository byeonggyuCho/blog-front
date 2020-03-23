import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { withRouter } from 'react-router-dom';
import {ReduxState} from 'store/modules'


const AskRemoveModalContainer = ({history, match }) => {

    const dispatch = useDispatch();
    const {visible} = useSelector( 
        (state:ReduxState)=>({
            visible: state.base.modal.remove
        }) 
    )

    const handleCancle = () => {
        dispatch(baseActions.hideModal<string>()('remove'))
    }

    const handleConfirm = () => {
        const { id } = match.params;

        try {
            // 포스트 삭제 후, 모달 닫고 웹사이트로 이동
            dispatch(postActions.removePost.request(id))
            dispatch(baseActions.hideModal<string>()("revmoe"))
            history.push('/');
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <AskRemoveModal visible={visible} onCancel={handleCancle} onConfirm={handleConfirm}/>
    );
}

export default(withRouter(AskRemoveModalContainer));
