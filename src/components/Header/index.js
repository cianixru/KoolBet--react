import React from 'react';
import ContentTabsRouter from './ContentTabsRouter';
import { withRouter, Link } from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';



class Header extends React.Component {

    state = {
        open: false,
        anchorEl: null,
      }; 
      handleClose = event => {
        this.setState({ open: false });
      };
      handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          open: !state.open,
        }));
      };

    render() {
        const { anchorEl, open } = this.state;
        return (
            <div className="top-line">
                <div className="header">
                    <div className="header__container">
                        <div className="header__logo-area">
                            <div className="header__logo">
                                <Link className="logo" to="/">
                                    <img src="https://www.koolbet237.com/pc/resources/img/logo/koolbet-logo-small.png" />
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
                                    {/* <Link to="/login">
                                        <div className="account-area__button button login">
                                            Login
                                        </div>
                                    </Link>
                                    <Link to="/registration">
                                        <div className="account-area__button button register">
                                            Register now
                                        </div>
                                    </Link> */}

                                    <div className="logged-account__container">
                                        <div class="user-info" aria-describedby="no-transition-popper" onClick={this.handleClick}></div>
       

                                        <Popper id="user-info__menu" open={open} anchorEl={anchorEl} transition aria-describedby="no-transition-popper">
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    id="menu-list-grow"
                                                 >
                                                <Paper>
                                                <ClickAwayListener onClickAway={this.handleClose}>
                                                    <MenuList>
                                                        <Link to="/login" onClick={this.handleClose}>Profile</Link>
                                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                            )}
                                        </Popper>


                                        <div className="user-balance">
                                            <div className="user-balance--refresh">
                                                <div className="user-balance--total">966,395.01 EUR</div>
                                            </div>
                                            <div className="user-balance--deposit"><a>+ Deposit</a></div>
                                        </div>
                                    </div>

                                </div>
                                <div className="account-area__button login-register" data-toggle="profileSidebar"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="accountMenu" class="account-menu--small">
                    <Link to="/registration">
                        <div class="account-area__button button login">
                            Login
                       </div>
                    </Link>
                    <Link to="/login">
                        <div class="account-area__button button register">
                            Register now!
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)