import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

class FootballMatchList extends Component {

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
                            {val.odds.map((e, index) => {
                                return <div className="cell" key={index} data-oddid={e.oddId}>
                                    <div
                                        className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId == e.oddId)) ? 'btn-active' : '')}
                                        data-oddtag="1"
                                        onClick={() => this.props.handleOddClick(e.oddId, val.betDomainId, matchId, tournamentId)}
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
        return (
            <Fragment>
                <div className="bets-area__wrapper">

                    <div className="cell">
                        {
                            (this.props.matchData && this.props.matchData.hasOwnProperty('betdomains'))
                                ?
                                this.props.matchData.betdomains.map((val, index) => {
                                    if (index % 2) {
                                        return this.renderMatchBlock(val, this.props.matchData.matchId, this.props.matchData.tournamentId, index)
                                    }
                                })
                                : null
                        }
                    </div>

                    <div className="cell">
                        {
                            (this.props.matchData && this.props.matchData.hasOwnProperty('betdomains'))
                                ? this.props.matchData.betdomains.map((val, index) => {
                                    if (!(index % 2)) {
                                        return this.renderMatchBlock(val, this.props.matchData.matchId, index)
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