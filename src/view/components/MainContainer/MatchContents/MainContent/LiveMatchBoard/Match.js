import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

let score;

class Match extends PureComponent {

    state = { match: {} }

    static getDerivedStateFromProps(props, state) {
        if (state.match && JSON.stringify(props.match) != JSON.stringify(state.match)) {
            return { ...state, match: props.match }
        }
        return { ...state }
    }

    handleOddClick = (oddId, betDomainId, matchId) => {
        if (this.props.state.odds && this.props.state.odds.find(el => el.oddId === oddId)) {
            this.props.dispatch({ type: 'DELETE_ODD', payload: oddId })
        } else {
            let toState = {
                type: 'live',
                tournamentId: this.props.state.tournamentId,
                matchId: matchId,
                groupId: '',
                betDomainId: betDomainId,
                oddId: oddId,
            }
            this.props.dispatch({ type: 'ADD_ODD', payload: toState })
        }
    }

    render() {

        if (this.props.match.score) {
            score = this.props.match.score.match(/\((.*?)\)/);
            if (score && score[1])
                score = score[1].split('-')
        }
        else
            score = ''

        let statusColor = '';

        if (this.props.match.status == 'Started')
            statusColor = "green"
        else
            statusColor = "red"

        if (this.props.match.periodinfo == 'Paused')
            statusColor = "yellow"

        return (
            <Fragment>
                <div id="odd-group-382" data-toggler=".collapse-tournaments">
                    <div className="tournament-group-name__container">
                        <div className="tournament-live-group-name">
                            <i className="tournament-live__icon"></i>
                            {this.props.match.tournament}</div>
                    </div>
                    <div className="sport-table live-table">
                        <div className="live-event-details__wrap">
                            <div className="coll-s">

                                <div className="match-info">
                                    <div className="cell-left">
                                        <div className="match-info__wrap">
                                            <div
                                                className={"match-info__time " + statusColor}>
                                                <span>
                                                    {
                                                        (this.props.match.sportname != 'Tennis')
                                                            ? (this.props.match.matchminute + ' min')
                                                            : 'Set'
                                                    }
                                                </span>
                                                <span>{this.props.match.periodinfo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cell-right">

                                        <div className="scoreboard__table">
                                            <div className="scoreboard__row--team">
                                                <div className="scoreboard__item scoreboard__item--team">
                                                    <div className="scoreboard__item--team--name" title="France">{this.props.match.home}</div>
                                                    <div className="scoreboard__item--team--cards">
                                                        {/* <div className="red-card"></div>
                                                        <div className="yellow-card"></div> */}
                                                    </div>
                                                </div>
                                                <div className="scoreboard__item scoreboard__item--total">
                                                    <div>{this.props.match.totalscore.split(':')[0]}</div>
                                                </div>
                                                {(score)
                                                    ? score.map((e, index) =>
                                                        <div key={index} className="scoreboard__item scoreboard__item--set">
                                                            <div>{e.split(':')[0]}</div>
                                                        </div>
                                                    )
                                                    : null
                                                }
                                            </div>
                                            <div className="scoreboard__row--team">
                                                <div className="scoreboard__item scoreboard__item--team">
                                                    <div className="scoreboard__item--team--name" title="New Zealand">{this.props.match.away}</div>
                                                </div>
                                                <div className="scoreboard__item scoreboard__item--total">
                                                    <div>{this.props.match.totalscore.split(':')[1]}</div>
                                                </div>
                                                {(score)
                                                    ? score.map((e, index) =>
                                                        <div key={index} className="scoreboard__item scoreboard__item--set">
                                                            <div>{e.split(':')[1]}</div>
                                                        </div>
                                                    )
                                                    : null
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="coll-a">

                                <div className="row head">
                                    <div className="cell-a match-specialoddvalue-value">
                                        <div>
                                            {this.props.match.Markets.map((market, index) => {
                                                if (index < 3) {
                                                    return (
                                                        < div className="match-group" key={index} >
                                                            <div className="market-odds">
                                                                <div className="cell">{market.betTitle}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="row subhead">
                                    <div className="cell-a match-specialoddvalue-value">
                                        <div>
                                            {this.props.match.Markets.map((market, index) => {
                                                if (index < 3) {
                                                    return (
                                                        <div className="match-group" key={index}>
                                                            <div className="market-odds">
                                                                {market.Odds.map((e, index) => {
                                                                    return <div key={index} className="cell">{e.oddtag}</div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="row odds">
                                    <div className="cell-a match-specialoddvalue-value">
                                        <div>

                                            {this.props.match.Markets.map((market, index) => {
                                                if (index < 3) {
                                                    return (
                                                        <div className="match-group" group-label={market.betTitle} key={index}>
                                                            <div className="market-odds">
                                                                {market.Odds.map((odd, index) => {
                                                                    return (
                                                                        <div className="cell" key={index} onClick={() => this.handleOddClick(odd.oddId, market.id, this.props.match.matchid)}>
                                                                            <div
                                                                                className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId == odd.oddId)) ? 'btn-active' : '')}
                                                                                data-oddtag={odd.oddtag}
                                                                            >
                                                                                <span className="">{odd.value}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>


                                                    )
                                                }
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cell-s go-to-all-markets">
                                <Link className="go-to-all-markets__button active" to={`/live/details/ - -${this.props.match.tournamentId}-${this.props.match.matchid}`}> <span className="hide-for-large">Show more</span>+85</Link>

                            </div>

                        </div>

                    </div>
                </div>
            </Fragment >
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            sportId: state.sportId,
            liveMatches: state.liveMatches,
            liveMenu: state.liveMenu,
            odds: state.odds,
        }
    }
}

export default connect(mapStateToProps)(Match)