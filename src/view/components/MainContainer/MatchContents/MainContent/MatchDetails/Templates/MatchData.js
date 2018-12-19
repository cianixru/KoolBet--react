import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

// import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router'

class MatchData extends PureComponent {

    state = { markets: [] };

    handleOddClick = (oddId, betDomainId, groupId, matchId, tournamentId, status) => {
        if (this.props.state.odds && this.props.state.odds.find(el => el.oddId === oddId)) {
            this.props.dispatch({ type: 'DELETE_ODD', payload: oddId })
        } else if ((status && status === 'V') || !status) {
            let toState = {
                type: this.props.type === '/sport' ? 'prematch' : this.props.type === '/live' ? 'live' : '',
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
            <div className="bets-block sport-table" key={index}>
                <div className="bets-block__header">
                    <span className="bets-block__header-bet-name" title={val.betTitle}>
                        {val.betTitle}
                    </span>
                </div>

                <div className="bets-block__body row">
                    <div className="match-group " group-label={val.betTitle}>
                        <div className="market-odds">
                            {val.Odds
                                .sort((a, b) => {
                                    if (a.oddsort > b.oddsort || a.sort > b.sort) {
                                        return 1
                                    }
                                    if (a.oddsort < b.oddsort || a.sort < b.sort) {
                                        return -1;
                                    }
                                    return 0;
                                })
                                .map((e, index) => {
                                    let disabled = false;
                                    if (
                                        this.props.state.odds.some(e => e.matchId === matchId)
                                        && this.props.state.odds.find(e => e.matchId === matchId).betDomainId !== val.id
                                    )
                                        disabled = true
                                    return <div className="cell" key={index} data-oddid={e.oddId}>
                                        <div
                                            className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === e.oddId)) ? 'btn-active' : ((e.betStatus && e.betStatus !== 'V') || disabled) ? ' btn-unavailable' : '')}
                                            data-oddtag={e.oddtagTr || e.oddtag}
                                            onClick={!disabled ? () => this.handleOddClick(e.oddId, val.id, this.props.marketGroup.id, matchId, tournamentId, e.betStatus) : null}
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
        let markets;

        if (this.props.type === '/sport') {
            markets = this.props.matchData.groups.find((e) => e.id === this.props.marketGroup.id).Markets
                .sort((a, b) => {
                    if (a.sort > b.sort) {
                        return 1
                    }
                    if (a.sort < b.sort) {
                        return -1;
                    }
                    return 0;
                })
                .sort((a, b) => {
                    if (a.specialoddvalue > b.specialoddvalue) {
                        return 1
                    }
                    if (a.specialoddvalue < b.specialoddvalue) {
                        return -1;
                    }
                    return 0;
                })
        } else if (this.props.type === '/live') {
            markets = this.props.matchData.Markets.sort((a, b) => {
                if (a.betTitle > b.betTitle) {
                    return 1
                }
                if (a.betTitle < b.betTitle) {
                    return -1;
                }
                return 0;
            })
                .sort((a, b) => {
                    if (a.specialoddvalue > b.specialoddvalue) {
                        return 1
                    }
                    if (a.specialoddvalue < b.specialoddvalue) {
                        return -1;
                    }
                    return 0;
                })
        }

        let matchId = this.props.matchData.matchId || this.props.matchData.matchid;

        return (
            <Fragment>
                <div className="bets-area__wrapper">

                    <div className="cell">
                        {
                            markets.map((val, index) => {
                                if (index % 2 === 0)
                                    return this.renderMatchBlock(val, matchId, this.props.matchData.tournamentId, index)
                                else
                                    return null;
                            })
                        }
                    </div>

                    <div className="cell">
                        {
                            markets.map((val, index) => {

                                if (index % 2 !== 0)
                                    return this.renderMatchBlock(val, matchId, this.props.matchData.tournamentId, index)
                                else
                                    return null;
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
            odds: state.odds,
        }
    }
}

export default connect(mapStateToProps)(MatchData)