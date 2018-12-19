import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router'
import { MemoryRouter as Router, withRouter } from 'react-router-dom' // 4.0.0

class bmgCorrectScore extends PureComponent {

    state = { markets: [] };

    static getDerivedStateFromProps(props, state) {
        let marketArr = {};
        if (props.market.tournament.value && JSON.stringify(props.market.tournament.value) !== JSON.stringify(state.prevTournament)
            || props.marketGroup.id !== state.prevGroup) {
            props.market.tournament.value.map(tournament => {
                tournament.groups.map(group => {
                    if (group.id === props.marketGroup.id) {
                        group.Markets.map(market => {
                            if (!Object.values(marketArr).some(e => e.betTitle === market.betTitle))
                                marketArr[market.id] = market
                        });
                    }
                })
            });
            return {
                ...state,
                markets: Object.values(marketArr),
                prevTournament: props.market.tournament.value,
                prevGroup: props.marketGroup.id
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
            };
            this.props.dispatch({ type: 'ADD_ODD', payload: toState })
        }
    };

    render() {
        let prevDate = '';

        return (
            <div className="bets-area__wrapper">
                <div className="cell">
                    <section className="templ--CORRECT_SCORE details">
                        <div className="tournament-group-name__container">
                            <div className="tournament-group-name">{this.props.marketGroup.txt}</div>
                        </div>

                        <div className="sport-table">


                            {this.props.market.tournament.value
                                .sort((a, b) => {
                                    return Date.parse(a.startdate) - Date.parse(b.startdate) || a.matchId - b.matchId
                                })
                                .map((tournament, index) => {
                                    // console.log(tournament);
                                    return <Fragment key={index}>



                                        <div className="row">
                                            <div className="cell-a match-specialoddvalue-value">
                                                <div>
                                                    {tournament.groups.map(group => {
                                                        if (group.id === this.props.marketGroup.id) {
                                                            // console.log(this.state.markets);
                                                            return this.state.markets
                                                                .map((e, index) => {
                                                                    return (
                                                                        <div className="match-group" group-label={e.betTitleName} key={index}>
                                                                            <div className="market-odds templ--CORRECT_SCORE">
                                                                                {
                                                                                    group.Markets.map(market => {
                                                                                        if (e.betTitle === market.betTitle) {
                                                                                            return market.Odds.sort((a, b) => {
                                                                                                if (market.number === 234 || market.number === 12) {
                                                                                                    if (a.oddtagTr > b.oddtagTr)
                                                                                                        return 1;
                                                                                                    if (a.oddtagTr < b.oddtagTr)
                                                                                                        return -1;
                                                                                                }
                                                                                                else {
                                                                                                    if (a.oddsort > b.oddsort)
                                                                                                        return 1;
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
                                                                                                // console.log(this.props.state.odds);
                                                                                                // console.log(tournament.matchId, market.id);
                                                                                                return (
                                                                                                    <Fragment>
                                                                                                        {(index === 17 || index === 21 || index === 24) ? <div className="lineBreak"></div> : ""}
                                                                                                        <div className="cell" key={index}>
                                                                                                            <div className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? 'btn-active' : disabled ? ' btn-unavailable' : '')}
                                                                                                                data-oddtag={odd.oddtagTr}
                                                                                                                onClick={!disabled ? () => this.handleOddClick(odd.oddId, market.id, group.id, tournament.matchId, tournament.tournamentId) : null}
                                                                                                            >
                                                                                                                {odd.value}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </Fragment>
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
                                        </div>
                                    </Fragment>
                                })}
                        </div>
                    </section>
                </div>
            </div>
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

export default connect(mapStateToProps)(withRouter(bmgCorrectScore))