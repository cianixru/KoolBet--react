import React, { Fragment, Component } from 'react';

import ContentTabsRouter from './ContentTabsRouter';
import { Link } from 'react-router-dom'

import NavigationDrawer from 'view/components/NavigationDrawer';
import NotAuthenticated from 'view/components/Header/MicroAccount/NotAuthenticated';
import MicroAccount from 'view/components/Header/MicroAccount';

import LanguageSwitcher from 'view/components/Header/LanguageSwitcher';
import { connect } from "react-redux";
import "./style.css"
class Header extends Component {

    state = {
        left: false,
        isAuthenticated: ""
    };

    componentDidMount() {
        if (this.props.state.tournamentCounter.currentTournamentCounter > 0)
            this.props.dispatch({ type: 'TOURNAMENT_COUNTER_CLEAR' });
    }


    drawLogo = () => {
        this.props.dispatch({ type: 'TOURNAMENT_COUNTER_CLEAR' });
        return ''
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    Authenticated = (val) => {
        if (val !== this.state.isAuthenticated)
            this.setState({ isAuthenticated: val });
    };

    render() {
        const { isAuthenticated, left } = this.state;
        return (
            <Fragment>
                <div className="header">
                    <div className="header__container">
                        <div className="header__logo-area">
                            {(isAuthenticated)
                                ? <div onClick={this.toggleDrawer('left', true)}
                                    className="account-area__button login-register"></div>
                                : ""}

                            <div className="header__logo">
                                <Link className="logo" to="/" onClick={this.drawLogo}>
                                    <img src="https://www.koolbet237.com/pc/resources/img/logo/koolbet-logo-small.png"
                                        alt="" />
                                </Link>
                            </div>
                            <ContentTabsRouter />
                        </div>

                        <div className="header__account-area">
                            <div className="account-area__container">
                                    <div className={"account-area__button lang-switcher"}>
                                        <LanguageSwitcher />
                                    </div>

                                <div id="accountMenu" className="account-menu">
                                    <MicroAccount Authenticated={(val) => this.Authenticated(val)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(!isAuthenticated)
                    &&
                    <div id="accountMenu" className="account-menu--small account-menu--small_update">
                        <NotAuthenticated />
                    </div>
                }

                <NavigationDrawer
                    isAuthenticated={isAuthenticated}
                    leftDrawerOpen={left}
                    toggleDrawer={(side, open) => this.toggleDrawer(side, open)}
                />
            </Fragment>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            tournamentCounter: state.topTournament,
        }
    }
}


export default connect(mapStateToProps)(Header);
