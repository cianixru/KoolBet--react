import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";


class CleanMatchData extends Component {
    render() {
        return (
            <Fragment>
                {this.props.dispatch({ type: 'CLEAR_SPORT_LIST'})}
                {this.props.dispatch({ type: 'CLEAR_SPORT_ID'})}
                {this.props.dispatch({ type: 'CLEAR_TOURNAMENT_LIST'})}
                {this.props.dispatch({ type: 'CLEAR_TOURNAMENT_ID'})}
                {this.props.dispatch({ type: 'CLEAR_ODD_LIST'})}
                {this.props.dispatch({ type: 'CLEAR_CURRENT_TOURNAMENT_DATA'})}
                {this.props.dispatch({ type: 'CLEAR_TOURNAMENTS_DATA'})}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            sportList: state.sportList,
            sportId: state.sportId,
            tournamentList: state.tournamentList,
            tournamentId: state.tournamentId,
            // matchId: state.matchId,
            // marketId: state.marketId,
            odds: state.odds,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,
        }
    }
}

export default connect(mapStateToProps)(CleanMatchData);