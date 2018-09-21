import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'

class ProfileSidebar extends Component {
    render() {
        return (
            <div className="profile__sidebar is-transition-overlap is-closed" id="profileSidebar">
                <div className="sidebar__inner">
                    <ul className="sidebar__menu vertical menu accordion-menu">

                        <li>
                            <NavLink to={"/profile/myaccount"} activeClassName="is-active">
                                <i className="myaccount__icon"></i>
                                My account
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={"/profile/mybets"} activeClassName="is-active">
                                <i className="mybets__icon"></i>
                                My bets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/profile/transaction"} activeClassName="is-active">
                                <i className="transaction__icon"></i>
                                Transaction
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/profile/mywallet"} activeClassName="is-active">
                                <i className="mywallet__icon"></i>
                                My wallet
                            </NavLink>
                            {/* <ul className="menu vertical nested">
                                <li>
                                    <a href="profile_add-funds.html">Add funds</a>
                                </li>
                                <li>
                                    <a href="profile_transactions-history.html">TRANSACTION HISTORY</a>
                                </li>
                            </ul> */}
                        </li>
                        <li>
                            <NavLink to={"/profile/affiliate"} activeClassName="is-active">
                                <i className="affiliate__icon"></i>
                                Affiliate
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default ProfileSidebar;