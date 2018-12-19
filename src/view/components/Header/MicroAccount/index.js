import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import IsAuthenticated from './IsAuthenticated';
import NotAuthenticated from './NotAuthenticated';

class MicroAccount extends Component {
    state = {};

    static getDerivedStateFromProps(props, state) {
        if(props.state.isAuthenticated !== state.prevIsAuthenticated) {
            props.Authenticated(props.state.isAuthenticated);
            return {
                ...state,
                isAuthenticated: props.state.isAuthenticated,
                prevIsAuthenticated: props.state.isAuthenticated,
            }    
        }
        return null
    }
    render() {
        return (
            <Fragment>
                {
                    (this.state.isAuthenticated)
                        ? <IsAuthenticated /> 
                        : <div className="hide-for-medium-dw"><NotAuthenticated /></div>
                }
            </Fragment>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    }
}
export default connect(mapStateToProps)(MicroAccount);