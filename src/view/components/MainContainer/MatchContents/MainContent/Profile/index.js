import React, { Component, Fragment } from 'react';
import { Route, withRouter } from "react-router-dom";
import asyncComponent from "./../../../../AsyncComponent";

const MyAccount = asyncComponent(() => import("./MyAccount"));
const MyBets = asyncComponent(() => import("./MyBets"));
const MyTransactions = asyncComponent(() => import("./MyTransactions"));
const MyWallet = asyncComponent(() => import("./MyWallet"));
const WalletTransaction = asyncComponent(() => import("./MyWallet/WalletTransaction"));
const Affiliate = asyncComponent(() => import("./Affiliate"));

class Profile extends Component {
    render() {
        return (
            <Fragment>
                <div className="header-nav--small h2--small">
                    <i className="back__icon"></i>
                    <span>{this.props.location.pathname.replace(this.props.match.path + '/', '').replace('my', 'my ')}</span>
                </div>
                <div className="profile">
                    <div className="profile__container">
                        <div className="profile__main">
                            <div className="profile__wrapper">
                                <div className="profile__inner">
                                    <Route path={'/profile/myaccount'} render={() => <MyAccount />} />
                                    <Route path={'/profile/mybets'} render={() => <MyBets />} />
                                    <Route path={'/profile/transaction'} render={() => <MyTransactions />} />
                                    <Route path={'/profile/mywallet'} render={() => <MyWallet />} exact />
                                    <Route path={'/profile/mywallet/:code'} render={(props) => <WalletTransaction code={props.match.params.code} />} />
                                    <Route path={'/profile/affiliate'} render={() => <Affiliate />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        );
    }
}

export default withRouter(Profile);