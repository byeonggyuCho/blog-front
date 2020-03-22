import React, { useEffect } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import * as BaseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';


const  HeaderContainer = ({ match, logged }) => {
    const handleRemove = () => {
        const { BaseActions } = this.props;
        BaseActions.showModal('remove');
    }

    const { id } = match.params;

    return (
        <Header
            postid={id}
            logged={logged}
            onRemove={handleRemove}
        />
    );
}


const mapDipatchToProp =  (dispatch) => ({
    BaseActions: bindActionCreators(BaseActions,dispatch)
})
const mapStateToProp = (state) => {

    if(typeof state.base.get !== 'function' )
       debugger;

    return {logged: state.base.get('logged')}
}

export default connect(
    mapStateToProp,
    mapDipatchToProp
)(withRouter(HeaderContainer));