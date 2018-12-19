import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

let score;
let marketNumber = 3;

class Match extends Component {

    state = { refreshClass: {} }

    componentDidMount() {
        setInterval(() => { this.setState({ refreshClass: {} }) }, 20000)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false;
        } else {
            return true
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let tempClass = '', oddsChanges = {};
        if(JSON.stringify(prevProps.state.match.Markets)!==JSON.stringify(this.props.state.match.Markets) && (Array.isArray(prevProps.state.match.Markets))&&prevProps.state.match.Markets.length>0){
            this.props.state.match.Markets.map((market) => {
                if (prevProps.state.match.Markets.some(e => e.id === market.id)) {
                    market.Odds.map((odd) => {
                        // console.log(state.prevData.Markets.find(e => e.id === market.id).Odds.find(e => e.oddId === odd.oddId).value);
                        if (odd.value > prevProps.state.match.Markets.find(e => e.id === market.id).Odds.find(e => e.oddId === odd.oddId).value) {
                            tempClass = 'odd--up'
                        }
                        else if (odd.value < prevProps.state.match.Markets.find(e => e.id === market.id).Odds.find(e => e.oddId === odd.oddId).value) {
                            tempClass = 'odd--down'
                        }

                        if (this.state.refreshClass[odd.oddId] !== tempClass)
                            oddsChanges[odd.oddId] = tempClass
                    })

                }
            })
            this.setState({refreshClass: {...oddsChanges }})
        }
    }

    handleOddClick = (oddId, betDomainId, matchId, status) => {
        if (this.props.state.odds && this.props.state.odds.find(el => el.oddId === oddId)) {
            this.props.dispatch({ type: 'DELETE_ODD', payload: oddId })
        } else if (status === 'V') {
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
        if (this.props.state.match.score) {
            score = this.props.state.match.score.match(/\((.*?)\)/);
            if (score && score[1])
                score = score[1].split('-')
        }
        else
            score = ''

        let statusColor = '';

        if (this.props.state.match.status === 'Started')
            statusColor = "green"
        else if (this.props.state.match.status === 'Stopped')
            statusColor = "gray"
        else
            statusColor = "red"

        if (this.props.state.match.periodinfo === 'Paused')
            statusColor = "yellow"

        return (
            <Fragment>
                <div>
                    <div className="tournament-group-name__container">
                        <div className="tournament-live-group-name">
                            <i className="tournament-live__icon"></i>
                            {this.props.state.match.tournament}
                        </div>
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
                                                        (this.props.state.match.sportname !== 'Tennis')
                                                            ? (this.props.state.match.matchminute + ' min')
                                                            : 'Set'
                                                    }
                                                </span>
                                                <span>{this.props.state.match.periodinfo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cell-right">

                                        <div className="scoreboard__table">
                                            <div className="scoreboard__row--team">
                                                <div className="scoreboard__item scoreboard__item--team">
                                                    <div className="scoreboard__item--team--name" title="France">{this.props.state.match.home}</div>
                                                    <div className="scoreboard__item--team--cards">
                                                        {/* <div className="red-card"></div>
                                                        <div className="yellow-card"></div> */}
                                                    </div>
                                                </div>
                                                {this.props.state.match.sportdescriptor==="soccer"&&(this.props.state.match.homecardsteam>0)?
                                                    <div className="scoreboard__item ">
                                                        <div className="red-card" title="Red cards"></div>
                                                    </div>
                                                    : <div className="scoreboard__item ">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>}
                                                <div className="scoreboard__item scoreboard__item--total">
                                                    <div>{this.props.state.match.totalscore.split(':')[0]}</div>
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
                                                    <div className="scoreboard__item--team--name" title="New Zealand">{this.props.state.match.away}</div>
                                                </div>
                                                {this.props.state.match.sportdescriptor==="soccer"&&(this.props.state.match.awaycardsteam>0)?
                                                    <div className="scoreboard__item ">
                                                        <div className="red-card" title="Red cards"></div>
                                                    </div>
                                                    : <div className="scoreboard__item ">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>}
                                                <div className="scoreboard__item scoreboard__item--total">
                                                    <div>{this.props.state.match.totalscore.split(':')[1]}</div>
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
                                            {this.props.state.match.Markets.map((market, index) => {
                                                if (index < marketNumber && market.betTitleType !== 'EXAFT_L') {
                                                    return (
                                                        <div className="match-group" key={index}>
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
                                            {this.props.state.match.Markets.map((market, index) => {
                                                if (index < marketNumber && market.betTitleType !== 'EXAFT_L') {
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
                                            {this.props.state.match.Markets.map((market, index) => {
                                                if (index < marketNumber && market.betTitleType !== 'EXAFT_L') {
                                                    return (
                                                        <div className="match-group" group-label={market.betTitle} key={index}>
                                                            <div className="market-odds">
                                                                {market.Odds.map((odd, index) => {
                                                                    let disabled = false;
                                                                    if (
                                                                        this.props.state.odds.some(e => e.matchId === this.props.state.match.matchid)
                                                                        && this.props.state.odds.find(e => e.matchId === this.props.state.match.matchid).betDomainId !== market.id
                                                                    )
                                                                        disabled = true
                                                                    return (
                                                                        <div className="cell" key={index} onClick={!disabled ? () => this.handleOddClick(odd.oddId, market.id, this.props.state.match.matchid, odd.betStatus) : null}>
                                                                            <div
                                                                                className={"specialoddvalue-text" + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? ' btn-active' : (odd.betStatus !== 'V' || disabled) ? ' btn-unavailable' : '')}
                                                                                data-oddtag={odd.oddtag}
                                                                            >

                                                                                <span className={this.state.refreshClass[odd.oddId]}
                                                                                >
                                                                                    {odd.value}
                                                                                </span>
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
                                <div className="go-to-all-markets__button">
                                    <Link to={`/live/details/ - -${this.props.state.match.tournamentId}-${this.props.state.match.matchid}`}> <span className="hide-for-large">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.LiveMatchBoard.Match.Button.ShowMore" defaultMessage="Show more" />
                                    </span> + {this.props.state.match.Markets.length} </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state,ownProps) {
    return {
        state: {
            sportId: state.sportId,
            match: state.liveMatches[ownProps.matchid],
            odds: state.odds,
        }
    }
}

export default connect(mapStateToProps)(Match)




/* static getDerivedStateFromProps(props, state) {
     let tempClass = '', oddsChanges = {};


     if (JSON.stringify(props.match) !== JSON.stringify(state.match)) {

         if (state.prevData && Array.isArray(props.match.Markets)) {
             props.match.Markets.map((market) => {
                 if (state.prevData.Markets.some(e => e.id === market.id)) {
                     market.Odds.map((odd) => {
                         // console.log(state.prevData.Markets.find(e => e.id === market.id).Odds.find(e => e.oddId === odd.oddId).value);
                         if (odd.value > state.prevData.Markets.find(e => e.id === market.id).Odds.find(e => e.oddId === odd.oddId).value) {
                             tempClass = 'odd--up'
                         }
                         else if (odd.value < state.prevData.Markets.find(e => e.id === market.id).Odds.find(e => e.oddId === odd.oddId).value) {
                             tempClass = 'odd--down'
                         }

                         if (state.refreshClass[odd.oddId] !== tempClass)
                             oddsChanges[odd.oddId] = tempClass
                     })

                 }
             })
         }
         return { refreshClass: { ...oddsChanges }, match: props.match, prevData: state.match }

     }
     return null
 }*/