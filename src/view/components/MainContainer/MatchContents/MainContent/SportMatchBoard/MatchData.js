import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class MatchData extends PureComponent {

    state = { markets: [] }

    static getDerivedStateFromProps(props, state) {
        let marketArr = {};
        props.market.tournament.value.map(tournament => {
            tournament.groups.map(group => {
                if (group.id == props.marketGroup) {
                    group.Markets.map(market => {
                        if (!state.markets.some(e => e.bettitle == market.betTitle))
                            marketArr[market.sort] = market
                    });
                }
            })
        })
        return {
            ...state,
            markets: Object.values(marketArr)
        }
    }


    handleOddClick = (oddId, betDomainId, groupId, matchId, tournamentId) => {
        if (this.props.state.odds && this.props.state.odds.find(el => el.oddId === oddId)) {
            this.props.dispatch({ type: 'DELETE_ODD', payload: oddId })
        } else {
            let toState = {
                type: 'prematch',
                tournamentId: tournamentId,
                matchId: matchId,
                groupId: groupId,
                betDomainId: betDomainId,
                oddId: oddId,
            }
            this.props.dispatch({ type: 'ADD_ODD', payload: toState })
        }
    }

    render() {
        // console.log(this.props);
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">{this.props.marketGroup}</div>
                </div>

                <div className="sport-table">
                    <div className="row head">
                        <div className="cell-s match-start-time-value">
                            <div></div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div></div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>

                                {this.state.markets.map((market, index) => {
                                    return (
                                        <div className="match-group" key={index}>
                                            <div className="market-odds">
                                                <div className="cell">{market.betTitle}</div>
                                            </div>
                                        </div>
                                    )
                                })}


                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>



                    <div className="row subhead">
                        <div className="cell-s match-start-time-value">
                            <div>TIME</div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div>TABLE EVENTS</div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                {this.state.markets.map((market, index) => {
                                    return (
                                        <div className="match-group" group-label="Match Bet" key={index}>
                                            <div className="market-odds">
                                                {market.Odds.sort((a, b) => {
                                                    if (a.oddsort > b.oddsort) {
                                                        return 1
                                                    }
                                                    if (a.oddsort < b.oddsort) {
                                                        return -1;
                                                    }
                                                    return 0;
                                                }).map((odd, index) => {
                                                    return <div className="cell" key={index}>{odd.oddtagTr}</div>
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>


                    <div className="row date">
                        <div className="date-value">{new Date(this.props.market.tournament.value[0].startdate).toLocaleDateString()}</div>
                    </div>



                    {this.props.market.tournament.value.map((tournament, index) => {
                        // console.log(tournament);
                        return <div className="row" key={index}>

                            <div className="cell-s match-start-time-value">
                                <div>{new Date(tournament.startdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                            <div className="cell-s match-team-value">
                                <div>{tournament.home} - {tournament.away}</div>
                            </div>
                            <div className="cell-a match-specialoddvalue-value">
                                <div>
                                    {tournament.groups.map(group => {
                                        if (group.id == this.props.marketGroup) {
                                            // console.log(this.state.markets);
                                            return this.state.markets.map((e, index) => {
                                                return (
                                                    <div className="match-group" group-label={e.betTitle} key={index}>

                                                        <div className="market-odds">
                                                            {
                                                                group.Markets.map(market => {
                                                                    if (e.betTitle == market.betTitle) {
                                                                        return market.Odds.sort((a, b) => {
                                                                            if (a.oddsort > b.oddsort) {
                                                                                return 1
                                                                            }
                                                                            if (a.oddsort < b.oddsort) {
                                                                                return -1;
                                                                            }
                                                                            return 0;
                                                                        }).map((odd, index) => {
                                                                            return (
                                                                                <div className="cell" key={index}>
                                                                                    <div
                                                                                        className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId == odd.oddId)) ? 'btn-active' : '')}
                                                                                        data-oddtag={odd.oddtagTr}
                                                                                        onClick={() => this.handleOddClick(odd.oddId, market.id, group.id, tournament.matchId, tournament.tournamentId)}
                                                                                    >
                                                                                        {odd.value}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })

                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    })}
                                </div>
                            </div>
                            <div className="cell-s go-to-all-markets" data-toggle="toggle011 go-to-all-markets" id="go-to-all-markets" data-toggler=".active">
                                <Link className="go-to-all-markets__button" to={`/sport/details/${tournament.sportId}-${tournament.countryId}-${tournament.tournamentId}-${tournament.matchId}`}>
                                    +{tournament.groups.reduce((a, b) => { return a + b.Markets.length }, 0)}</Link>
                            </div>
                        </div>
                    })}

                </div>
            </section>
        );
    }
}


function mapStateToProps(state) {
    return {
        state: {
            tournamentId: state.tournamentId,
            currentTournamentData: state.currentTournamentData,
            odds: state.odds,
            tournamentsData: state.tournamentsData,
        }
    }
}

export default connect(mapStateToProps)(withRouter(MatchData))