import React, { PureComponent } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

class Pages extends PureComponent {
    state = {
        data: [],
        currentUrl: false,
        parsedUrl: false,
        urlMap: false,
        locale: this.props.state.locale
    }

    componentDidMount() {
        this.setState({ parsedUrl: this.parserUrl() });
        this.importUrlMap()
    }

    componentDidUpdate(prevProps) {
        if (this.props.state.locale !== prevProps.state.locale) {
            this.importUrlMap()
        }
        if (this.state.urlMap.length && (this.props.location !== prevProps.location || !this.state.currentUrl)) {
            this.applyLocation()
        }
        if (this.props.location.pathname !== prevProps.location.pathname)
            this.setState({ parsedUrl: this.parserUrl() });
    }

    importUrlMap = () => {
        Promise.all([
            import(`./urlMap.${this.props.state.locale}.json`)

        ]).then((e) => {
            this.setState({ urlMap: e[0].default })
        })
    }

    htmlRequest = async (link) => {
        await import(`./${link}.html`).then(e => this.setState({ data: e.default }))
    }

    parserUrl = () => matchPath(this.props.location.pathname, {
        path: "/pages/:category/:item",
        exact: true,
        strict: false
    });

    applyLocation = () => {
        this.setState({ currentUrl: this.props.location.pathname },
            () => this.htmlRequest(this.state.urlMap.find(e => e.category === this.state.parsedUrl.params.category).items.find(e => e.url === this.props.location.pathname).dir));
    }

    render() {
        return (
            <div className="pages">
                <div className="pages__container">
                    <div className="pages__main">
                        <div className="pages__wrapper">
                            <div className="pages__inner">
                                {ReactHtmlParser(this.state.data)}
                            </div>
                        </div>
                    </div>
                </div>
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
export default withRouter(connect(mapStateToProps)(Pages));