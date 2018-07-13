import React from 'react';
import ContentTabs from './ContentTabs';
import { connect } from "react-redux";

class Header extends React.Component {

    PageSwitch = (e, page) => {
        switch (page) {
            case 'login':
            this.props.dispatch({ type: 'LOGIN_PAGE'})
            console.log('login');
            break;
            case 'register':
            console.log('register');
            this.props.dispatch({ type: 'REG_PAGE'})
            break;
        }
    }
    notAuthPageSwith = () => {
        this.props.dispatch({ type: 'NOT_AUTH'})
    }


    render() {
        return (

            <div className="top-line">
                <div className="header">
                    <div className="header__container">
                        <div className="header__logo-area">
                            <div className="header__logo">
                                <a className="logo" tabIndex="-1" onClick={this.notAuthPageSwith}>
                                    <img src="https://www.koolbet237.com/pc/resources/img/logo/koolbet-logo-small.png" alt="" />
                                </a>
                            </div>
                            {
                                (this.props.state.authorisePage == '' ) ?  <ContentTabs /> : null                            
                            }
                        </div>
                        <div className="header__account-area">
                            <div className="account-area__container">
                                <div className="account-area__button lang-switcher">
                                    <span className="lang-name icon-globus">EN</span>
                                    <span className="icon-arrow"></span>
                                </div>
                                <div id="accountMenu" className="account-menu" data-off-canvas>
                                    <div className="account-area__button button login" onClick={e=>this.PageSwitch(e, 'login')}>
                                        Login
                                    </div>
                                    <div className="account-area__button button register" onClick={e=>this.PageSwitch(e,'register')}>
                                        Register now
                                    </div>
                                </div>
                                <div className="account-area__button login-register" data-toggle="profileSidebar"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="accountMenu" class="account-menu--small">
                    <div class="account-area__button button login" onClick={e=>this.PageSwitch(e, 'login')}>
                        Login
                    </div>
                    <div class="account-area__button button register"  onClick={e=>this.PageSwitch(e,'register')}>
                        Register now!
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