import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import routes from "config/Routes"
import FooterMenuList from './../../../Footer/FooterMenuList';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

class MainContent extends Component {
    render() {
        return (
            <div className={"page-grid__item main scroll" + ((this.props.path.includes('/profile') || this.props.path.includes('/pages') ) ? ' profile' : '')} >
                <Scrollbars
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                    hideTracksWhenNotNeeded={true}
                >
                    <div path={this.props.location.pathname}>
                        {
                            routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.TopSidebar}
                                />
                            ))
                        }
                    </div>
                    {this.props.children}
                    
                    { (isWidthDown('sm', this.props.width) && <FooterMenuList /> ) }
                </Scrollbars>
            </div>
        );
    }
}

export default withRouter(withWidth()(MainContent));
