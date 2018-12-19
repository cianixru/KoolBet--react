import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Preloader extends Component {
    state = {
        isVirtual: this.props.location.pathname.match(".*\/virtual.*"),
        isSport: this.props.location.pathname === "/sport",
        isLive: this.props.location.pathname === "/live",
    }
    render() {

        return (
            <Fragment>
                <div className=
                {
                    (
                        (this.state.isLive && Object.keys(this.props.state.liveMatches).length > 0) 
                        || (this.state.isVirtual && Object.keys(this.props.state.virtualCurrentTournamentData).length > 0) 
                    )
                     ? '' : 'loading'
                }
                ></div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            liveMatches: state.liveMatches,
            virtualCurrentTournamentData: state.virtualCurrentTournamentData,
        }
    }
}

export default withRouter(connect(mapStateToProps)(Preloader));