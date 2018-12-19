import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom'
// import messages from "./messages.lang";
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';

class PagesSidebar extends PureComponent {
    state = {
        parsedUrl: false,
        locale: this.props.state.locale,
        urlMap: false
    }

    componentDidMount() {
        this.setState({ parsedUrl: this.parserUrl() });
        this.importUrlMap()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location)
            this.setState({ parsedUrl: this.parserUrl() });
        if (this.props.state.locale !== prevProps.state.locale) {
            this.importUrlMap()
        }
    }

    importUrlMap = () => {
        Promise.all([
            import(`./../../MainContent/Pages/urlMap.${this.props.state.locale}.json`)
        ]).then((e) => {
            this.setState({ urlMap: e[0].default })
        })
    }

    parserUrl = () => matchPath(this.props.location.pathname, {
        path: "/pages/:category/:item",
        exact: true,
        strict: false
    });

    render() {
        const { params } = this.state.parsedUrl;
        return (
            <div className="pages__sidebar is-transition-overlap is-closed" id="profileSidebar">
                <Scrollbars
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 0 }} className="view" />}
                    hideTracksWhenNotNeeded={true}
                >
                    <div className="sidebar__inner">
                        <ul className="sidebar__menu vertical menu accordion-menu">
                            <div className="sidebar__menu--header">{params && this.state.urlMap.length && this.state.urlMap.find(e => e.category === params.category).title}</div>
                            {params && this.state.urlMap.length && this.state.urlMap.find(e => e.category === params.category).items.map((e, index) => {
                                return (
                                    <li key={index}>
                                        <NavLink to={e.url} activeClassName="is-active">
                                            {e.label}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Scrollbars>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        state: {
            locale: state.intl.locale,
        }
    }
}

export default withRouter(connect(mapStateToProps)(PagesSidebar));