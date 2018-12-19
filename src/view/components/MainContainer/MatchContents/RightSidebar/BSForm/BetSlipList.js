import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import { systemTipSize } from './../BSLogic';
import LinearDeterminate from './LinearDeterminate';
import { FormattedMessage } from "react-intl";
import "./style.css"
class BetSlipList extends PureComponent {
    state = {
        singlePossibleWinStake: 0,
        possibleWinVariousStake: 0,
        multiplePossibleWinStake: 0,
        onVariousStakeChange: false,
        onSameStakeChange: false,
        SelectRemovedOddId: false,
        RemovedBetMarketId: false,
        lockButtons: false
    }


    static getDerivedStateFromProps(props, state) {
        let TournamentsBets;
        (props.isVirtual)
            ? TournamentsBets = props.state.virtualOdds
            : TournamentsBets = props.state.odds;

        if (props.errorResponse && props.errorResponse.faultCode) {
            switch (props.errorResponse.faultCode) {
                case 230:
                    setTimeout(() => {
                        props.dispatch({ type: 'DELETE_ODD', payload: parseInt(props.errorResponse.oddId, 10) })
                    }, 5300)
                    props.sendState('errorResponse', false)

                    return { SelectRemovedOddId: props.errorResponse.oddId }

                case 216:
                    TournamentsBets.filter(e => e.betDomainId === props.errorResponse.betMarketId).map(
                        e => {
                            setTimeout(() => {
                                props.dispatch({ type: 'DELETE_ODD', payload: parseInt(e.oddId, 10) })
                                return { RemovedBetMarketId: false }
                            }, 5300)
                            props.sendState('errorResponse', false)
                        }
                    )
                    return { RemovedBetMarketId: props.errorResponse.betMarketId }

                case 154:
                    console.log("Error 154");
                    break;

                case 156:
                    console.log("Error 156");
                    break;

                case 159:
                    console.log("Error 159");
                    break;

                case 217:
                    if (props.state.betList.newOddsArray !== props.errorResponse.problemOdds)
                        props.dispatch({ type: 'NEW_ODDS_ARRAY', payload: props.errorResponse.problemOdds });

                    console.log('217 ===> ', props.state.betList.newOddsArray);
                    break;

                default:
                    break;
            }
        }

        if (props.onSameStakeChange !== state.onSameStakeChange) {
            return {
                onSameStakeChange: props.onSameStakeChange
            }
        }
        if (props.isVirtual) {
            state.TournamentsBets = props.state.virtualOdds;
        } else {
            state.TournamentsBets = props.state.odds;
        }

        let singlePossibleWinStake = 0;
        let possibleWinVariousStake = 0;
        let multiplePossibleWinStake = 0;

        if (state.TournamentsBets.length !== 0)
            state.TournamentsBets.map((arr, index) => {
                let matchObj = props.state.betList.matchObj[index];
                if (typeof matchObj !== "undefined") {

                    let newOddsArray = props.state.betList.newOddsArray || false;
                    let newOddObj = false;
                    if (newOddsArray && newOddsArray.map(e => e.oddid).includes(matchObj.OddId)) {
                        newOddObj = newOddsArray.find(e => e.oddid === matchObj.OddId);
                    }

                    singlePossibleWinStake += parseFloat(newOddObj ? newOddObj.serverOddsValue : matchObj.Value);
                    (multiplePossibleWinStake === 0)
                        ? multiplePossibleWinStake = parseFloat(newOddObj ? newOddObj.serverOddsValue : matchObj.Value)
                        : multiplePossibleWinStake *= parseFloat(newOddObj ? newOddObj.serverOddsValue : matchObj.Value);
                    if (typeof props.state.betList.variousStakeValue[matchObj.OddId] !== "undefined") {
                        possibleWinVariousStake += props.state.betList.variousStakeValue[matchObj.OddId] * (newOddObj ? newOddObj.serverOddsValue : matchObj.Value);
                    }
                }
            })

        return {
            ...state,
            singlePossibleWinStake: singlePossibleWinStake,
            possibleWinVariousStake: possibleWinVariousStake,
            multiplePossibleWinStake: multiplePossibleWinStake,
            onVariousStakeChange: false,
            onSameStakeChange: false
        }

    }

    variousStakeChange = (event, id) => {
        this.props.dispatch({ type: 'VARIOUS_STAKE', id: id, payload: event.target.value.replace(/^0+(?!\.|$)/, '').replace(/\D/g,'') })
        this.setState({ onVariousStakeChange: true })
    }
    onBankerClick = (e, oddID) => {
        //console.log(this.props.state.betList)
        if (!e.currentTarget.classList.contains('lock')) {
            ((this.props.state.betList.bankersArray).includes(oddID))
                ? this.props.dispatch({ type: 'BANKERS_ARRAY_REMOVE', payload: oddID })
                : this.props.dispatch({ type: 'BANKERS_ARRAY', payload: oddID })
        }
    }

    handleSendWinStake = (singlePossibleWinStake, multiplePossibleWinStake, possibleWinVariousStake) => {
        this.props.onSetWinStake(singlePossibleWinStake, multiplePossibleWinStake, possibleWinVariousStake);
    }

    handleSendSameStakeChange = (props) => {
        this.props.onSendSameStakeChange(props);
    }
    render() {
        const { sameStake, currentTab } = this.props.state.betSlip;
        const { bankersArray, tournamentsCount, systemRadioValue, variousStakeValue } = this.props.state.betList;
        let bankers = [];

        const {faultCode} = this.props.errorResponse;

        const { SelectRemovedOddId, RemovedBetMarketId } = this.state;

        const betSlipList = this.state.TournamentsBets.map((arr, index) => {
            let matchObj = this.props.state.betList.matchObj[index];
        /*jshint ignore:start*/
         /*eslint-disable*/
         if (typeof matchObj !== "undefined") {
             (bankersArray.includes(matchObj.OddId))
             ? (bankers.includes(matchObj.OddId)) ? null : bankers.push(String.fromCharCode(97 + index).toUpperCase())
             : null
             
        /*eslint-enable*/
        /*jshint ignore:end*/
                let newOddsArray = this.props.state.betList.newOddsArray;
                let newOddObj = false;
                if (newOddsArray && newOddsArray.map(e => e.oddid).includes(matchObj.OddId)) {
                    newOddObj = newOddsArray.find(e => e.oddid === matchObj.OddId);
                }
                return (
                    <div className={
                        " bs__item " + matchObj.betMarketId +
                        (
                            (
                                (matchObj.OddId === parseInt(SelectRemovedOddId, 10))
                                ||
                                (matchObj.betMarketId === parseInt(RemovedBetMarketId, 10))
                            )
                            &&
                            " closed"
                        ) + ((matchObj.status === "Stopped" || matchObj.status === 15) && " lock")
                        } key={index}>
                        {
                            (
                                (matchObj.OddId === parseInt(SelectRemovedOddId, 10))
                                ||
                                (matchObj.betMarketId === parseInt(RemovedBetMarketId, 10))
                            )
                            &&
                            <div className="error-message__wp">
                                <div className="error-message">
                                    <div className="error-message__title">BETS SUSPENDED</div>
                                    <div className="error-message__countdown ">Removing outcome 5 sec</div>
                                </div>
                                <LinearDeterminate
                                    faultCode={faultCode}
                                    clearSelectRemovedOddId={(stateKey, state) => this.setState({ [stateKey]: state })}
                                />
                            </div>
                        }
                        { ((matchObj.status === "Stopped" || matchObj.status === 15) && <i className="lock__icon"></i>) }
                        <div className="bet-options">
                            {currentTab === 2
                                &&
                                <Fragment>
                                    <div className="system-letter">
                                        {String.fromCharCode(97 + index).toUpperCase()}
                                    </div>
                                    <i className={
                                        "bs-icon-banker " + (bankersArray.includes(matchObj.OddId) === true
                                            ? "active"
                                            : ((systemTipSize(tournamentsCount.length) - bankersArray.length) === 1 || systemRadioValue === 2) ? "lock" : ""
                                        )
                                    } onClick={(e) => this.onBankerClick(e, matchObj.OddId)}></i>
                                </Fragment>
                            }
                        </div>

                        <div className="bet-event">
                            <div className="row">

                                <div className={"bet-event__title " + matchObj.TournamentId}>
                                    {(matchObj.status)?<span className="live-status-betslip">LIVE</span>
                                        :null}
                                    {
                                        (this.props.isVirtual)
                                            ? (matchObj.SportId === 105 || matchObj.SportId === 104)
                                                ?
                                                matchObj.information
                                                :
                                                (matchObj.Competitors)
                                                    ? matchObj.Competitors[0].competitor.defaultName + "-" + matchObj.Competitors[1].competitor.defaultName
                                                    : matchObj.defaultName
                                            :
                                            matchObj.Home + "-" + matchObj.Away
                                    }
                                </div>
                                <div className="bs-options__option-odds">
                                    <span className="bs-options__odds-change"></span>
                                </div>

                                <div className={"bet-close icon"} 
                                    disabled={this.props.buttonsLock} 
                                    onClick={(!this.props.buttonsLock) ? 
                                        () => this.props.dispatch({ type: matchObj.DeleteOdd, payload: matchObj.OddId })
                                        : null}>
                                </div>
                            </div>
                            <div className="row space-between">
                                <div className="bet-event__market">{matchObj.Oddtag}</div>
                                <div className={"bet-event__rate " + 
                                       ((newOddObj.oddid)
                                            ? (newOddObj.serverOddsValue > newOddObj.requestedOddsValue)
                                                ? " bet-event__rate bs__odd--up" : " bet-event__rate bs__odd--down"
                                            : "")}
                                        >

                                    {(newOddObj) ? newOddObj.serverOddsValue : matchObj.Value}

                                </div>
                            </div>
                            <div className="row space-between">
                                <div className="bet-event__team">{matchObj.BetTitle}</div>
                                <div className="bet-event__item-link"><span>
                                    +{matchObj.BetdomainsLength}
                                </span></div>
                            </div>
                            {(currentTab === 0 && sameStake === false) &&
                                <div className="row bet-event__stakes space-between">
                                    <div className="stake">
                                        <div className="bs__stake-name"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.BSForm.BetSlipList.Stake" defaultMessage="Stake" /></div>
                                        <input className="bs__input" type="text" 
                                            value={variousStakeValue[matchObj.OddId] || 0}
                                            onChange={(e) => this.variousStakeChange(e, matchObj.OddId, (newOddObj ? newOddObj.serverOddsValue : matchObj.Value))}
                                            maxLength="6"
                                        />
                                    </div>
                                    <div className="estwin">
                                        <div className="bs__stake-name"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.BSForm.BetSlipList.EstWin" defaultMessage="Est Win" /></div>
                                        <input
                                            className="bs__input"
                                            type="number"
                                            value={
                                                (variousStakeValue[matchObj.OddId] && matchObj.Value)
                                                    ? (variousStakeValue[matchObj.OddId] * (newOddObj ? newOddObj.serverOddsValue : matchObj.Value)).toFixed(2)
                                                    : 0
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                );
            }
        });
        return (
            <Fragment>
                {betSlipList}
                {this.handleSendWinStake(this.state.singlePossibleWinStake, this.state.multiplePossibleWinStake, this.state.possibleWinVariousStake)}
                {this.handleSendSameStakeChange(this.state.onSameStakeChange)}

                {/* {console.log('odds =======>:', this.props.state.odds)}  */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        state: {
            betList: state.betList,
            betSlip: state.betSlip,
            odds: state.odds,
            virtualOdds: state.virtualOdds,
        }
    }
}
export default connect(mapStateToProps)(BetSlipList);

/*
*                                 {(this.props.isVirtual)?<span className="live-status">LIVE</span>
                                    :null}
* */