import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

class Forecast extends Component {
    state = {};

    static getDerivedStateFromProps(props, state) {
        if (props.matchData && !state[props.matchData.matchId])
            return { ...state, [props.matchData.matchId]: { first: '', second: '', any: [], toPlace: {} } }
        return null
    }

    componentDidUpdate() {
        let currentState, oddId = '', betDomainId = '', matchId = '', tournamentId = '', val = ''
        if (this.props.matchData) {
            matchId = this.props.matchData.matchId
            tournamentId = this.props.matchData.tournamentId
            currentState = this.state[matchId]
        }

        if (currentState.first && currentState.second) {
            if (this.props.matchData) {
                let ForecastArray = this.props.matchData.betdomains.find((val) => val.betdomainName == 'Forecast');
                let ForecastOdd = ForecastArray.odds.find(e => e.oddTag == (currentState.first + '-' + currentState.second))
                betDomainId = ForecastArray.betDomainId
                oddId = ForecastOdd.oddId;
                val = ForecastOdd.value
            }
            this.setState(prevState => {
                if (prevState[matchId] && prevState[matchId].toPlace.oddId != oddId)
                    return {
                        ...prevState, [matchId]: { ...prevState[matchId], toPlace: { oddId: oddId, betDomainId: betDomainId, matchId: matchId, tournamentId: tournamentId, val: val } }
                    }
            })
        }

        else if (currentState.any.length == 3) {
            this.setState(prevState => {
                if (this.props.matchData) {
                    let reverseForecastArray = this.props.matchData.betdomains.find((val) => val.betdomainName == 'ReverseForecast');
                    let reverseForecastOdd = reverseForecastArray.odds.find(e => e.oddTag == (currentState.any.sort().join('-')))
                    betDomainId = reverseForecastArray.betDomainId
                    oddId = reverseForecastOdd.oddId;
                    val = reverseForecastOdd.value
                }
                betDomainId = this.props.matchData.betdomains.find(e => e.betdomainName == 'ReverseForecast').betDomainId
                if (prevState[matchId] && prevState[matchId].toPlace.oddId != oddId)
                    return {
                        ...prevState, [matchId]: { ...prevState[matchId], toPlace: { oddId: oddId, betDomainId: betDomainId, matchId: matchId, tournamentId: tournamentId, val: val } }
                    }
            })
        }

        else {
            this.setState(prevState => {
                if (prevState[matchId] && Object.keys(prevState[matchId].toPlace).length !== 0)
                    return { ...prevState, [matchId]: { ...prevState[matchId], toPlace: {} } }
            });
        }
    }

    handleOddClick = ({ oddId, betDomainId, matchId, tournamentId }) => {
        this.props.handleOddClick(oddId, betDomainId, matchId, tournamentId)
    }

    handleClickPlace = (type, index) => {
        index = index + 1
        let matchId = this.props.matchData.matchId;
        switch (type) {
            case 'first':
                this.setState(prevState => {
                    if (prevState[matchId].first != index)
                        return { ...prevState, [matchId]: { ...prevState[matchId], first: index } }
                    else
                        return { ...prevState, [matchId]: { ...prevState[matchId], first: '' } }
                })
                break;

            case 'second':
                this.setState(prevState => {
                    if (prevState[matchId].second != index)
                        return { ...prevState, [matchId]: { ...prevState[matchId], second: index } }
                    else
                        return { ...prevState, [matchId]: { ...prevState[matchId], second: '' } }
                })
                break;

            case 'any':
                this.setState(prevState => {
                    if (prevState[matchId].any.includes(index))
                        return { ...prevState, [matchId]: { ...prevState[matchId], any: [...this.state[matchId].any.filter(e => e != index)] } }
                    else
                        return { ...prevState, [matchId]: { ...prevState[matchId], any: [...this.state[matchId].any, index] } }
                })
                break;

            default:
                break;
        }
    }

    render() {
        let val, currentState;
        if (this.props.matchData) {
            val = this.props.matchData;
            currentState = this.state[this.props.matchData.matchId]
        }
        return (
            <Fragment>

                <div className="race-bet__table ">
                    <div className="row head">
                        <div className="a cell">
                            <div>Horse</div>
                        </div>
                        <div className="cell place__cell">
                            <div>1st</div>
                        </div>
                        <div className="cell place__cell">
                            <div>2nd</div>
                        </div>
                        <div className="cell place__cell">
                            <div>3rd</div>
                        </div>
                        <div className="cell place__cell">
                            <div>Any</div>
                        </div>
                    </div>

                    {val
                        ? val.matchtocompetitors.sort((a, b) => { return a.homeTeam - b.homeTeam }).map((competitor, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="a cell team--details__cell">
                                        <div className="number">{competitor.homeTeam}</div>
                                        <div className="team--name">
                                            <div className="name">{competitor.competitor.defaultName}</div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text "
                                                    + ((currentState.first == index + 1) ? 'btn-active ' : (currentState.first != '') ? 'shading ' : '')
                                                    + ((currentState.any.length > 0 || currentState.second == index + 1) ? 'btn-unavailable' : '')
                                                }
                                                data-oddtag="Place"
                                                onClick={() => {
                                                    (currentState.any.length > 0 || currentState.second == index + 1)
                                                        ? null
                                                        : this.handleClickPlace('first', index)
                                                }}
                                            >
                                                1st
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text "
                                                    + ((currentState.second == index + 1) ? 'btn-active' : (currentState.second != '') ? 'shading ' : '')
                                                    + ((currentState.any.length > 0 || currentState.first == index + 1) ? 'btn-unavailable' : '')
                                                }
                                                data-oddtag="Place"
                                                onClick={() => {
                                                    (currentState.any.length > 0 || currentState.first == index + 1)
                                                        ? null
                                                        : this.handleClickPlace('second', index)
                                                }}
                                            >
                                                2nd
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text "
                                                    + (currentState.any.includes(index + 1)
                                                        ? 'btn-active ' :
                                                        ((currentState.first != '' || currentState.second != '' || currentState.any.length > 1) ? 'btn-unavailable' : ''))
                                                }
                                                data-oddtag="Place"
                                                onClick={() => {
                                                    (currentState.first != '' || currentState.second != '' || (currentState.any.length > 1 && !currentState.any.includes(index + 1)))
                                                        ? null
                                                        : this.handleClickPlace('any', index)
                                                }}
                                            >
                                                Any
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                    }

                    {currentState.toPlace.hasOwnProperty('oddId') && currentState.toPlace.oddId != '' ?
                        <div className="place-bets__w">
                            <button
                                type="button"
                                className="place-bets__button button"
                                onClick={() => this.handleOddClick(currentState.toPlace)}
                            >
                                <span className="odd--value">{currentState.toPlace.val}</span>
                                {this.props.state.odds.some(e => e.oddId == currentState.toPlace.oddId)
                                    ? 'Remove from '
                                    : 'Add to '
                                }bet slip
                            <i></i>
                            </button>
                        </div>
                        : null
                    }
                </div>
            </Fragment >
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

export default connect(mapStateToProps)(Forecast);