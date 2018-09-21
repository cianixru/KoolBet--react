import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

class Place extends Component {
    render() {
        let val;
        if (this.props.matchData)
            val = this.props.matchData.betdomains.find((val) => val.betdomainName == 'Place');
        // console.log(this.props);
        return (
            <Fragment>

                <div className="race-bet__table ">
                    <div className="row head">
                        <div className="a cell">
                            <div>Horse</div>
                        </div>
                        <div className="cell place__cell">
                            <div>Place</div>
                        </div>
                    </div>

                    {val
                        ? val.odds.sort((a, b) => { return a.sort - b.sort }).map((odd, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="a cell team--details__cell">
                                        <div className="number">{odd.sort}</div>
                                        <div className="team--name">
                                            <div className="name">{odd.information}</div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? 'btn-active' : '')}
                                                data-oddtag="Place"
                                                onClick={() => this.props.handleOddClick(odd.oddId, val.betDomainId, this.props.matchData.matchId, this.props.matchData.tournamentId)}
                                            >
                                                {odd.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                    }
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

export default connect(mapStateToProps)(Place);