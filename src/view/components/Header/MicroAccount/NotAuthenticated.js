import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NotAuthenticated extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/login">
                    <div className="account-area__button button login">
                        Login
                    </div>
                </Link>
                <Link to="/registration">
                    <div className="account-area__button button register">
                        Register now
                    </div>
                </Link>
            </React.Fragment>
        );
    }
}

export default NotAuthenticated;