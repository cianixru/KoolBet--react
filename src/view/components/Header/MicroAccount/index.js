import React, { Component } from 'react';
import { connect } from 'react-redux';

import IsAuthenticated from './IsAuthenticated';
import NotAuthenticated from './NotAuthenticated';

class MicroAccount extends Component {
    render() {
        const SwitchMicroAccount = (auth) => {
            if (auth) {
                return <IsAuthenticated />
            } else {
                return <NotAuthenticated />
            }
        }
        return (
            <React.Fragment>
                {SwitchMicroAccount(this.props.state.isAuthenticated)}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    };
}

export default connect(mapStateToProps)(MicroAccount);