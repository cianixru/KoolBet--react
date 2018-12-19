import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import GetBalance from 'view/Utils/GetBalance';
import { readCookie, deleteCookie } from "../../../Utils/Cookies";
import { withStyles } from '@material-ui/core/styles';
import messages from "./messages.lang";
import { FormattedMessage } from "react-intl";
import { balanceAPI } from "config/constants";
import { userAPI } from "../../../../config/constants";

class IsAuthenticated extends Component {
    state = {
        open: false,
        anchorEl: null,
    };

    handleClose = event => {
        this.setState({ open: false });
    }

    handleLogout = () => {
        this.setState({ open: false });
        this.props.dispatch({ type: 'AUTHORIZATION', payload: false });
        this.props.dispatch({ type: 'UPDATE_CURRENT_USER_DATA', data: {} });
        deleteCookie('token')
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };


    componentDidMount() {
        this.interval = setInterval(() => {
            let accessToken = readCookie('token');
            if (accessToken) {
                fetch(balanceAPI, {
                    method: "GET",
                    headers: { "Content-type": "application/json", "Authorization": "Bearer " + accessToken },
                    credentials: 'include',
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(response => {
                        if (response) {

                            this.props.dispatch({ type: 'SET_BALANCE', payload: response.response });
                        }
                    })
            }
        }, 30000);

        let accessToken = readCookie('token');
        if (accessToken) {
            this._asyncRequest = fetch(userAPI, {
                method: "GET",
                headers: { "Content-type": "application/json", "Authorization": "Bearer " + accessToken },
                credentials: 'include',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(response => {
                    this._asyncRequest = null;
                    if (response !== undefined) {
                        this.props.dispatch({ type: 'UPDATE_CURRENT_USER_DATA', data: response["response"] });
                    }
                })
        }


    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { anchorEl, open } = this.state;
        const { classes } = this.props;
        let menuItems = [
            ['My account', '/profile/myaccount'],
            ['My bets', '/profile/mybets'],
            ['Transaction', '/profile/transaction'],
            ['My wallet', '/profile/mywallet'],
            ['Affiliate', '/profile/affiliate'],
        ];
        return (
            <Fragment>
                <div className="logged-account__container">
                    <div className="user-info" aria-describedby="no-transition-popper" onClick={this.handleClick}></div>
                    <Popper id="user-info__menu" open={open} anchorEl={anchorEl} transition aria-describedby="no-transition-popper" classes={{ root: classes.p0 }}>
                        {({ TransitionProps, placement }) => (
                            <Grow classes={{ root: classes.p0 }}
                                {...TransitionProps}
                                id="menu-list-grow"
                            >
                                <Paper classes={{ root: classes.root }}>
                                    <ClickAwayListener onClick={this.handleClose}>
                                        <MenuList className="profile-dropdw-menu" >
                                            {
                                                menuItems.map((val, index) => {
                                                    return (
                                                        <MenuItem key={index} onClick={this.handleClose} classes={{ root: classes.MenuItem }}>
                                                            <Link to={val[1]}>
                                                                <FormattedMessage {...messages[val[0]]} />
                                                            </Link>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                            <MenuItem onClick={this.handleLogout} className={classes.Logout} classes={{ root: classes.MenuItem }}>
                                                <FormattedMessage id="Header.MicroAccount.IsAuthenticated.MenuItem.Logout" defaultMessage="Logout" />
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                    <div className="user-balance">
                        <div className="user-balance--refresh">
                            <div className="user-balance--total">
                                <GetBalance />
                            </div>
                        </div>
                        <div className="user-balance--deposit"><Link to="/profile/mywallet"><i className="deposit__icon"></i><span className="deposit__name">
                            <FormattedMessage id="Header.MicroAccount.IsAuthenticated.Deposit" defaultMessage="Deposit" />
                        </span></Link></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const styles = theme => ({
    Logout: {
        // background: 'red',
    },
    p0: {
        borderRadius: 3,
        '& > ul': {
            padding: '0',
        }

    },
    MenuItem: {
        height: 14,
        fontFamily: 'Roboto Condensed',
        color: '#000',
        '& a': {
            fontSize: 15,
            textDecoration: 'none',
            color: '#000',
            width: 80,
        }
    }
});

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(IsAuthenticated))
