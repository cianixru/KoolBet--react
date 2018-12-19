import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { FormattedMessage } from 'react-intl';


class Bmg1hCs extends PureComponent {

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
            })
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
            }
            this.props.dispatch({ type: 'ADD_ODD', payload: toState })
        }
    }

    render() {
        let prevDate = '';

        return (
            <div className="bets-area__wrapper">
                <div className="cell">

                    <div className="bets-block sport-table">

                        {this.props.market.tournament.value
                            .map((tournament, index) => {
                                return <Fragment key={index}>

                                    {tournament.groups.map(group => {
                                        if (group.id === this.props.marketGroup.id) {
                                            return this.state.markets
                                                .map((e, index) => {

                                                    return (
                                                        <Fragment>

                                                            <div className="bets-block__header">
                                                                <span className="bets-block__header-bet-name" title={e.betTitleName}>
                                                                    {e.betTitleName}
                                                                </span>
                                                            </div>
                                                            <div className="bets-block__body row">
                                                                <div className="match-group " group-label={e.betTitleName} key={index}>
                                                                    <div className="market-odds">

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
                                                                                            <div className="cell" data-oddtag={odd.oddtagTr} key={index}>
                                                                                                <div
                                                                                                    className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? 'btn-active' : disabled ? ' btn-unavailable' : '')}
                                                                                                    data-oddtag={odd.oddtagTr}
                                                                                                    onClick={!disabled ? () => this.handleOddClick(odd.oddId, market.id, group.id, tournament.matchId, tournament.tournamentId) : null}
                                                                                                >
                                                                                                    <span className="">{odd.value}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })

                                                                                }
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    )
                                                })
                                        }
                                    })}


                                </Fragment>
                            })}


                    </div>



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

export default connect(mapStateToProps)(withRouter(Bmg1hCs))