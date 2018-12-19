import React, { Fragment, Component } from 'react';
import asyncComponent from "./../AsyncComponent";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const BottomNavBar = asyncComponent(() => import('./BottomNavBar'));
const FooterNav = asyncComponent(() => import('./FooterNav'));

class Footer extends Component {
    render() {
        return (
            <Fragment>
                {isWidthUp('md', this.props.width)
                    ? <FooterNav />
                    : <BottomNavBar />
                }
            </Fragment>
        )
    }
}

export default (withWidth()(Footer));