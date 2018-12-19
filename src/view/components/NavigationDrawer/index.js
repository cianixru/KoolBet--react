import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ProfileSidebar from 'view/components/MainContainer/MatchContents/LeftSidebar/ProfileSidebar';

class NavigationDrawer extends PureComponent {
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Drawer classes={{ paper: this.props.classes.drawerPaper }} anchor="left" open={this.props.leftDrawerOpen} onClose={this.props.toggleDrawer('left', false)}>
                    <div className={classes.list + " show-ProfileSidebar"} onClick={this.props.toggleDrawer('left', false)}>
                        {(this.props.isAuthenticated) && <ProfileSidebar /> }
                    </div>
                </Drawer>
            </Fragment>
        );
    }
}

const styles = {
    drawerPaper: {
        background: '#22232e',

    },
    list: {
        width: 'auto',
    },
};

export default withStyles(styles)(NavigationDrawer);