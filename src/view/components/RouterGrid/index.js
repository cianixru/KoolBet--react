import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { connect } from "react-redux";
import asyncComponent from "view/components/AsyncComponent";

import routes from "./../../../config/Routes"

import LeftSidebar from 'view/components/MainContainer/MatchContents/LeftSidebar';
import MainContent from 'view/components/MainContainer/MatchContents/MainContent';

// import MatchDetails from 'view/components/MainContainer/MatchContents/MainContent/MatchDetails';
// import CleanMatchData from 'view/Utils/CleanMatchData';

/* Connects */
const SportWebSocketConnect  = asyncComponent(() => import('connectors/SportWebSocketConnect'));
const VirtualWebSocketConnect  = asyncComponent(() => import('connectors/VirtualWebSocketConnect'));

class RouterGrid extends Component {
    render() {
        const { isAuthenticated } = this.props.state;
        return (
            <div className="page__container">
                <div className={"page-grid" + ((isAuthenticated) ? " is-authorised" : "")}>

                    <Route exact path="/" component={() => <Redirect to="/sport" />} />
                    {(isAuthenticated)
                        ? ''
                        : <Route path="/profile" component={() => <Redirect to={"/login?redirect="+window.location.pathname} />} />
                    }

                    {/* Left Sidebar */}
                    <LeftSidebar path={this.props.location.pathname}>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.LeftSidebar}
                            />
                        ))}
                    </LeftSidebar>

                    {/* Main */}
                    <MainContent path={this.props.location.pathname}>
                        {
                            routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.MainContent}
                                />
                            ))
                        }
                    </MainContent>

                    <Route exact path="/profile" component={() => <Redirect to="/profile/myaccount" />} />

                    {/* Right Sidebar */}
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.RightSidebar}
                        />
                    ))}

                    {/* Utils */}
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.Utils}
                        />
                    ))}

                    {/* Connects */}

                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.Connects}
                        />
                    ))}

                    <Switch>
                        <Route path="/virtual" render={() => <VirtualWebSocketConnect />} />
                        <Route exact path="/" render={null} />
                        <Route path="*" render={() => <SportWebSocketConnect channel={this.props.location.pathname.replace('/', '')} />} />
                    </Switch>
                    
                </div>
            </div>
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


export default withRouter(connect(mapStateToProps)(RouterGrid));