import React, { Component } from 'react';
import { connect } from 'react-redux';


class Preloader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={(Object.keys(this.props.state.currentTournamentData).length > 0 || Object.keys(this.props.state.virtualCurrentTournamentData).length > 0) ? '' : 'loading'}></div>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(Preloader);


function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
            currentTournamentData: state.currentTournamentData,
            virtualCurrentTournamentData: state.virtualCurrentTournamentData,
        }
    }
}