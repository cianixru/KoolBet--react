import React from 'react';
import ContentTabs from './ContentTabs';
import { connect } from "react-redux";

class Header extends React.Component {

    regPageSwitch = () => {
        this.props.dispatch({ type: 'REG_PAGE'})
    }
    loginPageSwitch = () => {
        this.props.dispatch({ type: 'LOGIN_PAGE'})
    }
    notAuthPageSwith = () => {
        this.props.dispatch({ type: 'NOT_AUTH'})
    }


    render() {
        return (

            <div className="top-line">
                <div class="header">
                    <div class="header__container">
                        <div class="header__logo-area">
                            <div class="header__logo">
                                <a class="logo" tabindex="-1" onClick={this.notAuthPageSwith}>
                                    <img src="https://www.koolbet237.com/pc/resources/img/logo/koolbet-logo-small.png" alt="" />
                                </a>
                            </div>

                            {
                                (this.props.state.authorisePage == '' ) ?  <ContentTabs /> : null                            
                            }
                        </div>
                        <div class="header__account-area">
                            <div class="account-area__container">
                                <div class="account-area__button lang-switcher">
                                    <span class="lang-name icon-globus">EN</span>
                                    <span class="icon-arrow"></span>
                                </div>
                                <div id="accountMenu" class="account-menu" data-off-canvas>
                                    <div class="account-area__button button login" onClick={this.loginPageSwitch}>
                                        Login
                                    </div>
                                    <div class="account-area__button button register" onClick={this.regPageSwitch}>
                                        Register now
                                    </div>
                                </div>
                                <div class="account-area__button login-register" data-toggle="profileSidebar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        state:{
            authorisePage: state.authorisePage
        }
    }
  }

export default connect(mapStateToProps)(Header)