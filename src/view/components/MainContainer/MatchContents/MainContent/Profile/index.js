import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";

import MyAccount from './MyAccount';
import MyWallet from './MyWallet';

class Profile extends Component {
    render() {
        return (
            <Fragment>
                <div className="profile">
                    <div className="profile__container">
                        <div className="profile__main">
                            <div className="header-nav--small h2--small">
                                <i className="back__icon"></i>
                                <span>My account</span>
                            </div>
                            <div className="profile__wrapper">
                                <div className="profile__inner">
                                    <Route path={'/profile/myaccount'} component={() => <MyAccount />} />
                                    {/* <Route path={'/profile/mybets'} render={() => <MyBets />} /> */}
                                    {/* <Route path={'/profile/transaction'} render={() => <Transaction />} /> */}
                                    <Route path={'/profile/mywallet'} render={() => <MyWallet />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        );
    }
}

export default Profile;