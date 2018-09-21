import React from 'react';
import ContentTabsRouter from './ContentTabsRouter';
import { withRouter, Link } from 'react-router-dom'

import MicroAccount  from './MicroAccount'


class Header extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <div className="header__container">
                        <div className="header__logo-area">
                            <div className="header__logo">
                                <Link className="logo" to="/">
                                    <img src="https://www.koolbet237.com/pc/resources/img/logo/koolbet-logo-small.png" alt="" />
                                </Link>
                            </div>
                            <ContentTabsRouter location={this.props.location} />
                        </div>
                        <div className="header__account-area">
                            <div className="account-area__container">
                                <div className="account-area__button lang-switcher">
                                    <span className="lang-name icon-globus">EN</span>
                                    <span className="icon-arrow"></span>
                                </div>
                                <div id="accountMenu" className="account-menu">

                                   <MicroAccount />

                                </div>
                                <div className="account-area__button login-register" data-toggle="profileSidebar"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="accountMenu" className="account-menu--small">
                    <Link to="/registration">
                        <div className="account-area__button button login">
                            Login
                       </div>
                    </Link>
                    <Link to="/login">
                        <div className="account-area__button button register">
                            Register now!
                        </div>
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Header)