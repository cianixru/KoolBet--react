import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
/*jshint ignore:start*/
/*eslint-disable*/
class FootballMatchList extends Component {

    renderMatchBlock = (betdomain, matchId, tournamentId, index) => {
        return (
            <div key={index} className="bets-block sport-table">
                <div className="bets-block__header">
                    <span className="bets-block__header-bet-name" title="MATCH RESULT">
                        {betdomain.discriminator}
                    </span>
                </div>

                <div className="bets-block__body row">
                    <div className="match-group " group-label="MATCH RESULT">
                        <div className="market-odds">
                            {betdomain.odds.sort((a, b) => (a.sort - b.sort))
                                .map((e, index) => {
                                    let disabled = false;
                                    if (this.props.state.odds.some(e => e.matchId === matchId)
                                        && this.props.state.odds.find(e => e.matchId === matchId).betDomainId !== betdomain.betDomainId) {
                                        disabled = true;
                                    }
                                    return <div className="cell" key={index} data-oddid={e.oddId}>
                                        <div
                                            className={"specialoddvalue-text" + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === e.oddId)) ? ' btn-active' : (betdomain.status === 2 || disabled) ? ' btn-unavailable' : '')}
                                            data-oddtag={e.information}
                                            onClick={() => {
                                                (betdomain.status === 2 || disabled)
                                                    ? null
                                                    : this.props.handleOddClick(e.oddId, betdomain.betDomainId, matchId, tournamentId)
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
    }

    render() {
        let betdomains = this.props.matchData.betdomains.sort((a, b) => (a.sort - b.sort))
        return (
            <Fragment>
                <div className="bets-area__wrapper">

                    <div className="cell">
                        {
                            (this.props.matchData && this.props.matchData.hasOwnProperty('betdomains'))
                                ?
                                betdomains.map((betdomain, index) => {
                                    if (index % 2 === 0) {
                                        return this.renderMatchBlock(betdomain, this.props.matchData.matchId, this.props.matchData.tournamentId, index)
                                    }
                                })
                                : null
                        }
                    </div>

                    <div className="cell">
                        {
                            (this.props.matchData && this.props.matchData.hasOwnProperty('betdomains'))
                                ? betdomains.map((betdomain, index) => {
                                    if ((index % 2 === 1)) {
                                        return this.renderMatchBlock(betdomain, this.props.matchData.matchId, this.props.matchData.tournamentId, index)
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
        }
    }
}

export default connect(mapStateToProps)(FootballMatchList);