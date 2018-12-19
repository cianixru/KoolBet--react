import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import {FormattedMessage} from "react-intl";

class NotAuthenticated extends Component {
    render() {
        return (
            <Fragment>
                <Link to="/login">
                    <div className="account-area__button button login">
                        <FormattedMessage id="Header.MicroAccount.NotAuthenticated.Login" defaultMessage="Login"/>
                    </div>
                </Link>
                <Link to="/registration">
                    <div className="account-area__button button register">
                        <FormattedMessage id="Header.MicroAccount.NotAuthenticated.Register" defaultMessage="Register now"/>
                    </div>
                </Link>
            </Fragment>
        );
    }
}

export default NotAuthenticated;