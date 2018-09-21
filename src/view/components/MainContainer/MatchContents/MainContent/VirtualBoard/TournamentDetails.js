import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import FootballMatchList from './FootballMatchList';
import RaceMatchList from './RaceMatchList';

let matchData;

class TournamentDetails extends Component {

    componentWillReceiveProps(nextProps) {

    }

    handleOddClick = (oddId, betDomainId, matchId, tournamentId) => {
        // console.log(tournamentId);
        if (this.props.state.odds && this.props.state.odds.find(el => el.oddId === oddId)) {
            this.props.dispatch({ type: 'DELETE_VIRTUAL_ODD', payload: oddId })
        } else {
            let toState = {
                type: 'virtual',
                tournamentId: tournamentId,
                matchId: matchId,
                groupId: "",
                betDomainId: betDomainId,
                oddId: oddId,
            }
            this.props.dispatch({ type: 'ADD_VIRTUAL_ODD', payload: toState })
        }

    }

    render() {

        if (Object.keys(this.props.state.currentTournamentData).length !== 0 && this.props.state.currentTournamentData.tournament) {
            matchData = this.props.state.currentTournamentData.tournament.matchs[0];
        }
        return (
            <Fragment>
                <section className="bettig-panel">

                    {
                        (Object.keys(this.props.state.currentTournamentData).length > 0)
                            ? (this.props.state.sportId && this.props.state.sportId.toLowerCase() === 'football')
                                ? <FootballMatchList matchData={matchData} handleOddClick={(oddId, betDomainId, matchId, tournamentId) => this.handleOddClick(oddId, betDomainId, matchId, tournamentId)} />
                                : <RaceMatchList matchData={matchData} handleOddClick={(oddId, betDomainId, matchId, tournamentId) => this.handleOddClick(oddId, betDomainId, matchId, tournamentId)} />
                            : null
                    }

                </section>
            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            sportId: state.virtualSportId,
            tournamentId: state.virtualTournamentId,
            currentTournamentData: state.virtualCurrentTournamentData,
            odds: state.virtualOdds,
        }
    }
}

export default connect(mapStateToProps)(TournamentDetails);