import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActoinCreators} from 'redux';


class HeaderContainer extends Component {
    handleRemove = () => {
        const { BaseActions } = this.props;
        BaseActions.showModal('remove');
    }


    render() {
        const { handleRemove } = this;
        const { match, logged } = this.props;
        const { id } = match.params;

        return (
            <Header
                postid={id}
                logged={logged}
                onRemove={handleRemove}
            />
        );
    }
}

export default connect(
    (state) => ({
        logged: state.base.get('logged')
    }),
    (dispatch) => ({
        BaseActions: bindActoinCreators(baseActions. dispatch)
    })
)(withRouter(HeaderContainer));