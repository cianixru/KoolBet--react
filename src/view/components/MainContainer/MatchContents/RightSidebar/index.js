import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import BSArea from './BSArea';

class RightSidebar extends PureComponent {
    state = {
        bottom: true,
    };

    toggleDrawer = (side, open) => {
        this.props.dispatch({ type: 'BN_ACTION', payload: open })
    };

    render() {
        return (
            <Fragment>
                <Hidden mdDown>                   
                    <BSArea toggleDrawer={(side, open) => this.toggleDrawer(side, open)} />
                </Hidden>
                <Hidden mdUp>
                    <Drawer
                        anchor="bottom"
                        open={this.props.state.bottomNavigation.bnAction === 2 ? true : false}
                        variant="persistent"
                    >
                        <BSArea toggleDrawer={(side, open) => this.toggleDrawer(side, open)} />
                    </Drawer>
                </Hidden>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state: {
            bottomNavigation: state.bottomNavigation,
        }
    }
}
export default connect(mapStateToProps)(RightSidebar);