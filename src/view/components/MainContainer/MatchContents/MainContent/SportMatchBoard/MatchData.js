import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { FormattedMessage } from "react-intl";
// import { stat } from 'fs';


class MatchData extends PureComponent {

    state = { markets: [] }

    static getDerivedStateFromProps(props, state) {
        let marketArr = {};
        if (
            (props.market.tournament.value && JSON.stringify(props.market.tournament.value) !== JSON.stringify(state.prevTournament))
            || (props.marketGroup && props.marketGroup.id !== state.prevGroup)
        ) {
            props.market.tournament.value.map(tournament => {
                tournament.groups.map(group => {
                    if (props.marketGroup && group.id === props.marketGroup.id) {
                        group.Markets.map(market => {
                            if (!Object.values(marketArr).some(e => e.betTitle === market.betTitle))
                                marketArr[market.id] = market
                        });
                    }
                    if (!props.marketGroup) {
                   //     console.log('there is no marketGroup :', props);
                    }
                })
            })
            return {
                ...state,
                markets: Object.values(marketArr),
                prevTournament: props.market.tournament.value,
                prevGroup: (props.marketGroup) ? props.marketGroup.id : null
            }
        }
        return null
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
        let prevDate = '';

        return (
            <section>
                {this.props.marketGroup
                    ?
                    <Fragment>
                        <div className="tournament-group-name__container">
                            <div className="tournament-group-name">{this.props.marketGroup.txt}</div>
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
                                        {this.state.markets
                                            .map((market, index) => {
                                                return (
                                                    <div className="match-group" key={index}>
                                                        <div className="market-odds">
                                                            <div className="cell">{market.betTitleName}</div>
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
                                    <div><FormattedMessage id="MainContainer.MatchContents.MainContent.SportMatchBoard.MatchData.Column.Time" defaultMessage="TIME" /></div>
                                </div>
                                <div className="cell-s match-team-value">
                                    <div><FormattedMessage id="MainContainer.MatchContents.MainContent.SportMatchBoard.MatchData.Column.TableEvents" defaultMessage="TABLE EVENTS" /></div>
                                </div>
                                <div className="cell-a match-specialoddvalue-value">
                                    <div>
                                        {this.state.markets
                                            .map((market, index) => {
                                                return (
                                                    <div className="match-group" key={index}>
                                                        <div className="market-odds">
                                                            {market.Odds.sort((a, b) => {
                                                                if (market.number === 234 || market.number === 12) { // 234 - 1H Cor score, 12 - ...
                                                                    if (a.oddtagTr > b.oddtagTr)
                                                                        return 1
                                                                    if (a.oddtagTr < b.oddtagTr)
                                                                        return -1;
                                                                }
                                                                else {
                                                                    if (a.oddsort > b.oddsort)
                                                                        return 1
                                                                    if (a.oddsort < b.oddsort)
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

                            {this.props.market.tournament.value
                                .sort((a, b) => {
                                    return Date.parse(a.startdate) - Date.parse(b.startdate) || a.matchId - b.matchId
                                })
                                .map((tournament, index) => {
                                    // console.log(tournament);
                                    return <Fragment key={index}>
                                        {
                                            (new Date(tournament.startdate).toLocaleDateString() !== prevDate)
                                                ?
                                                <div className="row date">
                                                    <div className="date-value">{prevDate = new Date(tournament.startdate).toLocaleDateString()}</div>
                                                </div>
                                                : null
                                        }

                                        <div className="row">
                                            <div className="cell-s match-start-time-value">
                                                <div>{new Date(tournament.startdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </div>
                                            <div className="cell-s match-team-value">
                                                <div>{tournament.home} - {tournament.away}</div>
                                            </div>
                                            <div className="cell-a match-specialoddvalue-value">
                                                <div>
                                                    {tournament.groups.map(group => {
                                                        if (this.props.marketGroup && group.id === this.props.marketGroup.id) {
                                                            // console.log(this.state.markets);
                                                            return this.state.markets
                                                                .map((e, index) => {
                                                                    return (
                                                                        <div className="match-group" group-label={e.betTitleName} key={index}>

                                                                            <div className="market-odds">
                                                                                {
                                                                                    group.Markets.map(market => {
                                                                                        if (e.betTitle === market.betTitle) {
                                                                                            return market.Odds.sort((a, b) => {
                                                                                                if (market.number === 234 || market.number === 12) {
                                                                                                    if (a.oddtagTr > b.oddtagTr)
                                                                                                        return 1
                                                                                                    if (a.oddtagTr < b.oddtagTr)
                                                                                                        return -1;
                                                                                                }
                                                                                                else {
                                                                                                    if (a.oddsort > b.oddsort)
                                                                                                        return 1
                                                                                                    if (a.oddsort < b.oddsort)
                                                                                                        return -1;
                                                                                                }
                                                                                                return 0;
                                                                                            }).map((odd, index) => {
                                                                                                let disabled = false;
                                                                                                if (
                                                                                                    this.props.state.odds.some(e => e.matchId === tournament.matchId)
                                                                                                    && this.props.state.odds.find(e => e.matchId === tournament.matchId).betDomainId !== market.id
                                                                                                )
                                                                                                    disabled = true
                                                                                                return (
                                                                                                    <div className="cell" key={index}>
                                                                                                        <div
                                                                                                            className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? 'btn-active' : disabled ? ' btn-unavailable' : '')}
                                                                                                            data-oddtag={odd.oddtagTr}
                                                                                                            onClick={!disabled ? () => this.handleOddClick(odd.oddId, market.id, group.id, tournament.matchId, tournament.tournamentId) : null}
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
                                                <div className="go-to-all-markets__button">
                                                    <Link to={`/sport/details/${tournament.sportId}-${tournament.countryId}-${tournament.tournamentId}-${tournament.matchId}`}>
                                                        +{tournament.groups.reduce((a, b) => { return a + b.Markets.length }, 0)}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                })}
                        </div>
                    </Fragment>
                    : null
                }
            </section>
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

export default connect(mapStateToProps)(withRouter(MatchData))