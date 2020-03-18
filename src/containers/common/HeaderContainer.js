import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import * as BaseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';


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


const mapDipatchToProp =  (dispatch) => ({
    BaseActions: bindActionCreators(BaseActions,dispatch)
})

// const mapStateToProp = (state) => ({
//     logged: state.base.get('logged')
// })
const mapStateToProp = (state) => {

    return {
        logged:""
    }
}

export default connect(
    mapStateToProp,
    mapDipatchToProp
)(withRouter(HeaderContainer));