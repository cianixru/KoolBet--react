import React, { Component } from 'react';
import { connect } from "react-redux";

import { NavLink } from 'react-router-dom'
import messages from "./messages.lang";
import { FormattedMessage } from "react-intl";
import { deleteCookie } from "./../../../../../../view/Utils/Cookies";

class ProfileSidebar extends Component {
    handleLogout = () => {
        this.setState({ open: false });
        this.props.dispatch({ type: 'AUTHORIZATION', payload: false });
        this.props.dispatch({type: 'UPDATE_CURRENT_USER_DATA', data: {}});
        deleteCookie('token')
    };
    render() {
        const links = [
            {
                label: "My account",
                ico: "myaccount__icon",
                url: "/profile/myaccount",
            }, {
                label: "My bets",
                ico: "mybets__icon",
                url: "/profile/mybets",
            }, {
                label: "Transaction",
                ico: "transaction__icon",
                url: "/profile/transaction",
            }, {
                label: "My wallet",
                ico: "mywallet__icon",
                url: "/profile/mywallet",
            }, {
                label: "Affiliate",
                ico: "affiliate__icon",
                url: "/profile/affiliate",
            }
        ];
        return (
            <div className="profile__sidebar is-transition-overlap is-closed" id="profileSidebar">
                <div className="sidebar__inner">
                    <ul className="sidebar__menu vertical menu accordion-menu">
                        {links.map((e, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={e.url} activeClassName="is-active">
                                        <i className={e.ico}></i>
                                        <FormattedMessage {...messages[e.label]} />
                                    </NavLink>
                                </li>
                            )
                        })}
                        <li>
                            <a onClick={this.handleLogout}>
                                <i className="logout__icon"></i>
                                Logout
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    }
}

export default connect(mapStateToProps)(ProfileSidebar)
