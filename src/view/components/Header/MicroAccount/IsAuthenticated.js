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
import { deleteCookie } from 'view/Utils/Cookies';


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
        deleteCookie('token')
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
            <Fragment>
                <div className="logged-account__container">
                    <div className="user-info" aria-describedby="no-transition-popper" onClick={this.handleClick}></div>
                    <Popper id="user-info__menu" open={open} anchorEl={anchorEl} transition aria-describedby="no-transition-popper">
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                            >
                                <Paper>
                                    <ClickAwayListener onClick={this.handleClose}>
                                        <MenuList>
                                            <Link to="/profile">
                                                <MenuItem onClick={this.handleClose}>
                                                    Profile
                                                </MenuItem>
                                            </Link>
                                            <Link to="/profile/myaccount">
                                                <MenuItem onClick={this.handleClose}>
                                                    My account
                                                </MenuItem>
                                            </Link>
                                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
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
                        <div className="user-balance--deposit"><a>+ Deposit</a></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    }
}

export default connect(mapStateToProps)(IsAuthenticated)
