import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { FormattedMessage } from "react-intl";
// import { stat } from 'fs';

/*jshint ignore:start*/
/*eslint-disable*/
class MatchData extends PureComponent {

    state = { counter: 0 };

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

    render() {
        if(this.props.marketGroup == null){
            console.log(this.props.matchData);
        }
        let tournament = this.props.matchData;
        let filteredSortedMarkets = tournament.matchs[0].betdomains.filter(market =>{
            return this.props.marketGroup.betdomainIds.includes(market.betDomainNumber.toString());
        }).sort((a, b) => a.sort - b.sort);

        console.log(this.state.counter++);
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">{this.props.marketGroup.txts}</div>
                </div>

                <div className="sport-table">

                    <div className="row head">
                        <div className="cell-s match-team-value">
                            <div></div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                {
                                    filteredSortedMarkets.map((market, index) => {
                                        return <div className="match-group" key={index}>
                                            <div className="market-odds">
                                                <div title={market.betdomainName} className="cell">{market.discriminator}</div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        {
                            <div className="cell-s go-to-all-markets">
                                <div></div>
                            </div>
                        }
                    </div>
                    <div className="row subhead">
                        <div className="cell-s match-team-value">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.SportMatchBoard.MatchData.Column.TableEvents" defaultMessage="TABLE EVENTS" /></div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                {filteredSortedMarkets
                                    .map((market, index) => {
                                        return (
                                            <div className="match-group" key={index}>
                                                <div className="market-odds">
                                                    {
                                                        market.odds
                                                            .sort((a, b) => a.sort - b.sort)
                                                            .map((odd, index) => {
                                                                return <div className="cell"
                                                                            key={index}>{odd.information}</div>
                                                            })
                                                    }
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
                    {
                        tournament.matchs
                            .sort((a, b) => (a.btrMatchId - b.btrMatchId))
                            .map((match, index) => {

                            return <Fragment>
                                <div className="row" key={index}>
                                    <div className="cell-s match-team-value">
                                        <div>
                                            {match.matchtocompetitors.filter(matchtocompetitor => matchtocompetitor.homeTeam === 1)[0].competitor.defaultName}
                                            - {index + 1} -
                                            {match.matchtocompetitors.filter(matchtocompetitor => matchtocompetitor.homeTeam === 2)[0].competitor.defaultName}
                                        </div>
                                    </div>
                                    <div className="cell-a match-specialoddvalue-value">
                                        <div>
                                            {
                                                match.betdomains
                                                    .filter(betdomain => {
                                                        return this.props.marketGroup.betdomainIds.includes(betdomain.betDomainNumber.toString());
                                                    })
                                                    .sort((a, b) => a.sort - b.sort)
                                                    .map(market => {
                                                        return <div className="match-group" group-label="Match Bet">
                                                            <div className="market-odds">
                                                                {market.odds
                                                                    .sort((a, b) => a.sort - b.sort)
                                                                    .map((odd, index) => {
                                                                        let disabled = false;
                                                                        if (this.props.state.odds.some(e => e.matchId === market.matchId)
                                                                            && this.props.state.odds.find(e => e.matchId === market.matchId).betDomainId !== market.betDomainId) {
                                                                            disabled = true;
                                                                        }
                                                                        return (
                                                                            <div className="cell" key={index}>
                                                                                <div
                                                                                    className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? ' btn-active' : (this.props.closed || disabled) ? ' btn-unavailable' : '')}
                                                                                    data-oddtag={odd.information}
                                                                                    onClick={() => {
                                                                                        (this.props.closed || disabled)
                                                                                            ? null
                                                                                            : this.handleOddClick(odd.oddId, market.betDomainId, match.matchId, tournament.tournamentId)
                                                                                    }
                                                                                    }
                                                                                >
                                                                                    {odd.value}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                            </div>
                                                        </div>
                                                    })
                                            }
                                        </div>
                                    </div>
                                    <div className="cell-s go-to-all-markets" data-toggle="toggle011 go-to-all-markets" id="go-to-all-markets" data-toggler=".active">
                                        <div className="go-to-all-markets__button">
                                            {
                                                <Link
                                                    to={{pathname:`/virtual/matchdetails/${tournament.tournamentId}-${match.matchId}`, state: match}}>
                                                    {/*params={{ matchData: match }}>*/}
                                                    + all
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Fragment>

                        })}
                </div>
            </section>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            tournamentId: state.virtualTournamentId,
            odds: state.virtualOdds,
        }
    }
}

export default connect(mapStateToProps)(withRouter(MatchData))