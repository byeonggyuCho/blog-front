import React, { Compnent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { withRouter } from 'react-router-dom';

class AskRemoveModalContainer extends Compnent {
    handleCancle = () => {
        const { BaseActions } = this.props;
        BaseActions.handleCancle('remove');
    }

    handleConfirm = async () => {
        const { BaseActions, PostActions, history, match } = this.props;
        const { id } = match.params;

        try {
            // 포스트 삭제 후, 모달 닫고 웹사이트로 이동
            await PostActions.removePost(id);
            BaseActions.hideModal('remove');
            history.push('/');
        } catch(e) {
            console.error(e);
        }
    }

    render() {
        const { visible } = this.props;
        const { handleCancle, handleConfirm } = this;

        return (
            <AskRemoveModal visible={visible} onCancel={handleCancle} onConfrim={handleConfirm}/>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'remove'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(AskRemoveModalContainer));
