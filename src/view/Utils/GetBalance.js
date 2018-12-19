import {Component, Fragment} from 'react';
import { readCookie } from './Cookies';
import { connect } from "react-redux";

import { balanceAPI } from "config/constants";
import React from "react";

class GetBalance extends Component {

    componentDidMount() {
        let accessToken = readCookie('token');
        if (accessToken) {
            fetch(balanceAPI, {
                method: "GET",
                headers: { "Content-type": "application/json", "Authorization": "Bearer " + accessToken },
                credentials: 'include',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(response => {
                    if (response !== undefined) {
                        if (this.props.state.balance && (this.props.state.balance.amount !== response.response.amount)) {
                            this.props.dispatch({ type: 'SET_BALANCE', payload: response.response });
                        }
                    }
                })
        }
    }


    render() {
        return <Fragment>{this.props.state.balance.amount-this.props.state.balance.reserved}  {this.props.state.userData.currency}</Fragment>;
    }
}


function mapStateToProps(state) {
    return {
        state: {
            balance: state.balance,
            userData:state.userData.currentUserData
        }
    }
}

export default connect(mapStateToProps)(GetBalance)
