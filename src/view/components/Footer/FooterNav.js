import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';

import FooterMenuList from './FooterMenuList';

class FooterNav extends Component {
    state = {
        bottom: false,
        persistent: false
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: !open,
            persistent: true
        });
    };


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <div className="footerExpander expand__icon" onClick={this.toggleDrawer('bottom', this.state.bottom)}></div>
                <Drawer
                    anchor="bottom"
                    open={this.state.bottom}
                    variant={this.state.persistent ? "persistent" : "temporary"}
                    classes={{ paperAnchorDockedBottom: classes.paperAnchorDockedBottom, docked: classes.docked }}
                >
                    <div className="footerExpander down expand__icon" onClick={this.toggleDrawer('bottom', this.state.bottom)}></div>
                    <div className="footer-wp">
                        {(isWidthUp('sm', this.props.width)
                            &&
                            <FooterMenuList
                                setState={stateParams => this.setState(stateParams)}
                                bottomState={this.state.bottom}
                            />
                        )
                        }
                    </div>
                </Drawer>
            </Fragment>
        )
    }
}
const styles = {
    docked: {
        background: '#333!important',
    },
    paperAnchorDockedBottom: {
        borderTop: '0!important',
        background: "transparent!important",
        overflow: "hidden",
    }
};

export default withRouter(withWidth()(withStyles(styles)(FooterNav)));