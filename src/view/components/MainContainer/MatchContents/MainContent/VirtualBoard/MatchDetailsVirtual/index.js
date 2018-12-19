import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import TournamentList from "../TournamentList";
import StreemVideo from "../StreemVideo";


/*jshint ignore:start*/
/*eslint-disable*/

let matchData;

class MatchDetailsVirtual extends Component {

    state = {matchData:{}};

    componentWillUnmount() {
        matchData = null;
    }

    componentDidMount() {
        let matchParams = this.props.matchId.split('-');
        let tournamentId = matchParams[0];
        let matchId = matchParams[1];
        if (this.props.state.currentTournamentData.tournament.tournamentId.toString() === tournamentId) {
            matchData = this.props.state.currentTournamentData.tournament.matchs.find(e => e.matchId.toString() === matchId)
        }
        else {
            // this.props.dispatch({ type: 'CLEAR_CURRENT_TOURNAMENT_DATA' })
            this.props.dispatch({ type: 'ADD_VIRTUAL_TOURNAMENT_ID', payload: tournamentId });
            // matchData = this.props.state.currentTournamentData.find(e => e.tournament.tournamentId === tournamentId)
        }
    }

    static getDerivedStateFromProps(props, state) {
        let matchParams = props.matchId.split('-');
        let tournamentId = matchParams[0];
        let matchId = matchParams[1];
        if (props.state.currentTournamentData.tournament.tournamentId.toString() === tournamentId) {
            matchData = props.state.currentTournamentData.tournament.matchs.find(e => e.matchId.toString() === matchId)
        }
        return null

    }

    // static getDerivedStateFromProps(props, state) {
    //     let matchParams = props.matchId.split('-');
    //     let tournamentId = matchParams[0];
    //     let matchId = matchParams[1];
    //     let tournament = props.state.currentTournamentData.tournament;
    //     state.matchData = tournament.matchs.find((match) => match.matchId.toString() === matchId)
    //     return state;
    // }

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
            };
            this.props.dispatch({ type: 'ADD_VIRTUAL_ODD', payload: toState })
        }
    };

    renderMatchBlock = (val, matchId, tournamentId, index) => {
        return (
            <div key={index} className="bets-block sport-table">
                <div className="bets-block__header">
                    <span className="bets-block__header-bet-name" title="MATCH RESULT">
                        {val.discriminator}
                    </span>
                </div>

                <div className="bets-block__body row">
                    <div className="match-group " group-label="MATCH RESULT">
                        <div className="market-odds">
                            {val.odds.sort((a, b) => (a.sort - b.sort))
                                .map((e, index) => {
                                    let disabled = false;
                                    if (this.props.state.odds.some(e => e.matchId === matchId)
                                        && this.props.state.odds.find(e => e.matchId === matchId).betDomainId !== val.betDomainId) {
                                        disabled = true;
                                    }
                                    return <div className="cell" key={index} data-oddid={e.oddId}>
                                        <div
                                            className={"specialoddvalue-text" + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === e.oddId)) ? ' btn-active' : (val.status === 2 || disabled) ? ' btn-unavailable' : '')}
                                            data-oddtag={e.information}
                                            onClick={() => {
                                                (val.status === 2 || disabled)
                                                    ? null
                                                    : this.handleOddClick(e.oddId, val.betDomainId, matchId, tournamentId)
                                            }}
                                        >
                                            <span className="" >{e.value}</span>{/* odd--down */}
                                        </div>
                                    </div>
                                })}

                        </div>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        // let matchData = this.state.matchData;
        let betdomains = matchData.betdomains.sort((a, b) => (a.sort - b.sort));
        let homeTeam = matchData.matchtocompetitors.filter(matchtocompetitor => matchtocompetitor.homeTeam === 1)[0].competitor.defaultName;
        let awayTeam = matchData.matchtocompetitors.filter(matchtocompetitor => matchtocompetitor.homeTeam === 2)[0].competitor.defaultName;
        let kironCompetitorId = matchData.matchtocompetitors[0].competitor.kironCompetitorId.split('_')[0];
        let sportName = kironCompetitorId.split('_')[0];
        return (
            <Fragment>
                <StreemVideo sportName={sportName} sportId={sportName} />

                <div>
                    <div className="sport__title__wrapper">
                        <i className="sport__back-button back__icon" onClick={this.props.history.goBack}></i>
                        <span className="sport__title">{homeTeam + ' - ' + awayTeam}</span>
                    </div>
                </div>

                <div className="bets-area__wrapper">

                    <div className="cell">
                        {
                            (matchData && matchData.hasOwnProperty('betdomains'))
                                ?
                                betdomains.map((val, index) => {
                                    if (index % 2 === 0) {
                                        return this.renderMatchBlock(val, matchData.matchId, matchData.tournamentId, index)
                                    }
                                })
                                : null
                        }
                    </div>

                    <div className="cell">
                        {
                            (matchData && matchData.hasOwnProperty('betdomains'))
                                ? betdomains.map((val, index) => {
                                    if ((index % 2 === 1)) {
                                        return this.renderMatchBlock(val, matchData.matchId, matchData.tournamentId, index)
                                    }
                                })
                                : null
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

/*eslint-enable*/
/*jshint ignore:end*/
function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            tournamentId: state.virtualTournamentId,
            odds: state.virtualOdds,
            currentTournamentData: state.virtualCurrentTournamentData
        }
    }
}

export default connect(mapStateToProps)(withRouter(MatchDetailsVirtual))
