import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class MatchData extends PureComponent {

    state = { markets: [] }

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

    renderMatchBlock = (val, matchId, tournamentId, index) => {
        return (
            <div className="bets-block sport-table">
                <div className="bets-block__header">
                    <span className="bets-block__header-bet-name" title={val.betTitle}>
                        {val.betTitle}
                    </span>
                </div>

                <div className="bets-block__body row">
                    <div className="match-group " group-label={val.betTitle}>
                        <div className="market-odds">
                            {val.Odds.sort((a, b) => {
                                if (a.oddsort > b.oddsort || a.sort > b.sort) {
                                    return 1
                                }
                                if (a.oddsort < b.oddsort || a.sort < b.sort) {
                                    return -1;
                                }
                                return 0;
                            }).map((e, index) => {
                                return <div className="cell" key={index} data-oddid={e.oddId}>
                                    <div
                                        className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId == e.oddId)) ? 'btn-active' : '')}
                                        data-oddtag={e.oddtagTr || e.oddtag}
                                        onClick={() => this.handleOddClick(e.oddId, val.id, this.props.marketGroup, matchId, tournamentId)}
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
    }

    render() {
        let markets

        if (this.props.type == '/sport') {
            markets = this.props.matchData.groups.find((e) => e.id == this.props.marketGroup).Markets.sort((a, b) => {
                if (a.sort > b.sort) {
                    return 1
                }
                if (a.sort < b.sort) {
                    return -1;
                }
                return 0;
            })
        } else if (this.props.type == '/live') {
            markets = this.props.matchData.Markets.sort((a, b) => {
                if (a.betTitle > b.betTitle) {
                    return 1
                }
                if (a.betTitle < b.betTitle) {
                    return -1;
                }
                return 0;
            })
        }

        return (
            <Fragment>
                <div className="bets-area__wrapper">

                    <div className="cell">
                        {
                            markets.map((val, index) => {
                                if (index % 2 == 0) {
                                    return this.renderMatchBlock(val, this.props.matchData.matchId, this.props.matchData.tournamentId, index)
                                }

                            })
                        }
                    </div>

                    <div className="cell">
                        {
                            markets.map((val, index) => {

                                if (index % 2 != 0) {
                                    return this.renderMatchBlock(val, this.props.matchData.matchId, this.props.matchData.tournamentId, index)
                                }

                            })

                        }
                    </div>
                </div>
            </Fragment>
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