import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import './modal.css';
import './BSForm.css';

import { getLimitsJSON } from './JSON/getLimits';
import { ticketAPI } from "config/constants";
import { readCookie } from 'view/Utils/Cookies';
import SystemList  from './SystemList';
import { getVal, getValLive, coefsCalc, totalSystemCoef, systemTipSize, getBonusAmount, systemCombinations, tournamentsCount } from './../BSLogic';
import { withRouter } from 'react-router-dom';

const accessToken = readCookie('token');
let TournamentsBets, TournamentsObjLive, TournamentsObj;

class BSForm extends Component {
    state = {
        modalOpen: false,
    }

    static getDerivedStateFromProps(props, state) {      
        if (props.location.pathname === "/sport" || props.location.pathname === "/live") {
            TournamentsBets = props.state.odds;
            TournamentsObjLive = props.state.liveMatches;
            TournamentsObj = props.state.tournamentsData;
        }
        if (props.location.pathname === "/virtual") {
            TournamentsBets = props.state.virtualOdds;
            TournamentsObj = props.state.virtualTournamentsData;
        }

        const getBetsArray = props.state.odds.map((arr) => {
            if (props.state.tournamentsData.find(e => e.tournament.tournamentId == arr.tournamentId)) 
                return getVal(props.state.tournamentsData, arr, 4).oddId
        })
        props.state.betList.bankersArray.map(e => {
            (getBetsArray).includes(e)
                ? null
                : props.dispatch({ type: 'BANKERS_ARRAY_REMOVE', payload: e })
        })
        return { ...state }
    }

    handleBankerClick = (e, oddID) => {
        if (!e.currentTarget.classList.contains('lock')) {
            ((this.props.state.betList.bankersArray).includes(oddID))
                ? this.props.dispatch({ type: 'BANKERS_ARRAY_REMOVE', payload: oddID })
                : this.props.dispatch({ type: 'BANKERS_ARRAY', payload: oddID })
        }
    }

    variousStakeHandleChange = (event, id) => {
        this.props.dispatch({ type: 'VARIOUS_STAKE', id: id, payload: event.target.value })
    }

    sameStakeHandleChange = (event) => {
        this.props.dispatch({ type: 'SAME_STAKE', payload: event.target.value })
    }

    sendRequest = (requestBody, allOddsArray, currentTab) => {       
        if (currentTab !== 0) allOddsArray = [1];
        allOddsArray.map(async (e, index) => {
            const makeRequest = await fetch(ticketAPI, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": accessToken
                },
                body: JSON.stringify(requestBody(index))
            })
            const answer = await makeRequest.json();
            const result = await answer;
            console.log('answer :', result);
            if (result.ok) {
                this.onClear();
            }
            else {
                console.log('answer Error (status):', answer.status);
                console.log('answer Error (error):', answer.error);
                console.log('answer Error (message):', answer.message);
            }
        })
    };

    onPlaceBet = (e, requestBody, allOddsArray) => {
        this.sendRequest(requestBody, allOddsArray, this.props.state.betSlip.tab);
    }

    onClear = (e) => {
        this.props.dispatch({ type: 'CLEAR_BETLIST' });
        this.props.dispatch({ type: 'CLEAR_ODD_LIST' })
    }

    // getBetsArray = (e) => {
    //     return this.props.state.odds.map((arr) => {
    //         if (this.props.state.tournamentsData.find(e => e.tournament.tournamentId == arr.tournamentId)) return getVal(this.props.state.tournamentsData, arr, 4).oddId
    //     })
    // }

    alertBox = (minStake, maxStake) => {
        let val, message;
        if ((this.props.state.betSlip.sameStake === true && this.props.state.betSlip.tab === 0) || this.props.state.betSlip.tab !== 0) {
            val = Number(this.props.state.betList.stakeValue);
        }
        else {
            // val = 200;
        }
        if (val < minStake) message = "Your stake is below minimum. Enter valid stake";
        if (val > maxStake) message = "Your stake is above maximum. Defaulting to maximum";
        if (message) return (<div className="bs__limit-message"><div><i className="alert"></i>{message}</div></div>);
    };

    render() {
        
        

        let tipSize = Object.keys(TournamentsBets).length;
        let possibleWinVariousStake = 0;
        let singlePossibleWinStake = 0;
        let multiplePossibleWinStake = 0;
        let allOddsArray = [];
        let minStake, maxStake, maxWin, minCombination, maxCombination, maxOdd, maxSystemBet;
        let currentTab = this.props.state.betSlip.tab;
        switch (currentTab) {
            case 0:
                minStake = getLimitsJSON[0].response.single.minStakeSingleBet * tipSize;
                maxStake = getLimitsJSON[0].response.single.maxStakeSingleBet;
                maxWin = getLimitsJSON[0].response.single.maxWinSingleBet;
                break;
            case 1:
                minStake = getLimitsJSON[0].response.multiple.minStakeCombiBet;
                maxStake = getLimitsJSON[0].response.multiple.maxStakeCombi;
                maxWin = "5000000.00";
                minCombination = getLimitsJSON[0].response.multiple.minCombination;
                maxCombination = getLimitsJSON[0].response.multiple.maxCombination;
                break;
            case 2:
                minStake = getLimitsJSON[0].response.system.minStakeSystemBet;
                maxStake = getLimitsJSON[0].response.system.maxStakeSystemBet;
                maxWin = getLimitsJSON[0].response.system.maxWinSystemBet;
                maxOdd = getLimitsJSON[0].response.system.maxOdd;
                maxSystemBet = getLimitsJSON[0].response.system.maxSystemBet;
                break;
        }
        let bonusAmount = (tipSize > 1) ? getBonusAmount(tipSize, getLimitsJSON) : "0";

        let bankers = [];
        let betSlipList = TournamentsBets.map((arr, index) => {

            let objType;
            if (arr.type === "live") objType = TournamentsObjLive;
            else if (arr.type === "prematch") objType = TournamentsObj;

            // console.log('TournamentsObj :', JSON.stringify(TournamentsObj));
            // console.log('id :', getValLive(TournamentsObjLive, arr, 1).id);
            // console.log('getValLive1 :', getValLive(TournamentsObjLive, arr, 0).matchid);
            // console.log('getValLive2 :', getValLive(TournamentsObjLive, arr, 1));
            // console.log('getValLive3 :', getValLive(TournamentsObjLive, arr, 2).value);
            // console.log('getValLive3 :', getValLive(TournamentsObjLive, arr, 2).oddId);
            // console.log('TournamentsObjLive :', JSON.stringify(TournamentsObjLive));
            // LIVE

            if (arr.type === "live" && Object.keys(objType).some(e => e == arr.matchId)) {
                allOddsArray.push(parseFloat(getValLive(objType, arr, 2).value));
                singlePossibleWinStake += parseFloat(getValLive(objType, arr, 2).value);
                // console.log('singlePossibleWinStake :', singlePossibleWinStake);


                (multiplePossibleWinStake === 0)
                    ? multiplePossibleWinStake = parseFloat(getValLive(objType, arr, 2).value)
                    : multiplePossibleWinStake *= parseFloat(getValLive(objType, arr, 2).value);

                if (typeof this.props.state.betList.variousStakeValue[getValLive(TournamentsObjLive, arr, 2).oddId] !== "undefined") {
                    possibleWinVariousStake += this.props.state.betList.variousStakeValue[getValLive(TournamentsObjLive, arr, 2).oddId] * getValLive(objType, arr, 2).value;
                }

                (this.props.state.betList.bankersArray.includes(getValLive(TournamentsObjLive, arr, 2).oddId))
                    ? (bankers.includes(getValLive(TournamentsObjLive, arr, 2).oddId)) ? null : bankers.push(String.fromCharCode(97 + index).toUpperCase())
                    : null

                return (
                    <div className="bs__item ">
                        <div className="bet-options">
                            {currentTab === 2
                                ? <Fragment>
                                    <div className="system-letter">{String.fromCharCode(97 + index).toUpperCase()}</div>
                                    <i className={
                                        "bs-icon-banker " + (this.props.state.betList.bankersArray.includes(getValLive(TournamentsObjLive, arr, 2).oddId) === true
                                            ? "active"
                                            : ((systemTipSize(tournamentsCount(TournamentsBets, TournamentsObj, TournamentsObjLive)) - this.props.state.betList.bankersArray.length) === 1 || this.props.state.betList.systemRadioValue === 2) ? "lock" : ""
                                        )
                                    } onClick={(e) => this.handleBankerClick(e, getValLive(TournamentsObjLive, arr, 2).oddId)}></i>
                                </Fragment>
                                : null}
                        </div>
                        <div className="bet-event">
                            <div className="row">
                                <div className="bet-event__title">
                                    {getValLive(TournamentsObjLive, arr, 0).home + "-" + getValLive(TournamentsObjLive, arr, 0).away}
                                </div>
                                <div className="bs-options__option-odds">
                                    <span className="bs-options__odds-change"></span>
                                </div>
                                <div className="bet-close icon" onClick={() => this.props.dispatch({ type: 'DELETE_ODD', payload: getValLive(TournamentsObjLive, arr, 2).oddId })}>
                                </div>
                            </div>
                            <div className="row space-between">
                                <div className="bet-event__market">{getValLive(TournamentsObjLive, arr, 2).oddtag}</div>
                                <div className="bet-event__rate">{getValLive(objType, arr, 2).value}</div>
                            </div>
                            <div className="row space-between">
                                <div className="bet-event__team">{getValLive(TournamentsObjLive, arr, 1).betTitle}</div>
                                <div className="bet-event__item-link"><span>
                                    +
                                </span></div>
                            </div>
                            {currentTab === 0 && this.props.state.betSlip.sameStake === false
                                ? <div className="row bet-event__stakes space-between">
                                    <div className="stake">
                                        <div className="bs__stake-name">Stake</div>
                                        <input className="bs__input" type="number" min="1" max="5000000"
                                            value={this.props.state.betList.variousStakeValue[getValLive(TournamentsObjLive, arr, 2).oddId]}
                                            onChange={(e) => this.variousStakeHandleChange(e, getValLive(TournamentsObjLive, arr, 2).oddId, getValLive(objType, arr, 2).value)}
                                        />
                                    </div>
                                    <div className="estwin">
                                        <div className="bs__stake-name">Est Win</div>
                                        <input className="bs__input" type="number" value={(this.props.state.betList.variousStakeValue[getValLive(TournamentsObjLive, arr, 2).oddId] * getValLive(objType, arr, 2).value).toFixed(2) || 0} disabled />
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                );
            }

            // PREMATCH
            if (arr.type === "prematch" && TournamentsObj.find(e => e.tournament.tournamentId == arr.tournamentId)) {

                allOddsArray.push(parseFloat(getVal(TournamentsObj, arr, 4).value));
                singlePossibleWinStake += parseFloat(getVal(TournamentsObj, arr, 4).value);

                (multiplePossibleWinStake === 0)
                    ? multiplePossibleWinStake = parseFloat(getVal(TournamentsObj, arr, 4).value)
                    : multiplePossibleWinStake *= parseFloat(getVal(TournamentsObj, arr, 4).value);

                if (typeof this.props.state.betList.variousStakeValue[getVal(TournamentsObj, arr, 4).oddId] !== "undefined") {
                    possibleWinVariousStake += this.props.state.betList.variousStakeValue[getVal(TournamentsObj, arr, 4).oddId] * getVal(TournamentsObj, arr, 4).value;
                }

                (this.props.state.betList.bankersArray.includes(getVal(TournamentsObj, arr, 4).oddId))
                    ? (bankers.includes(getVal(TournamentsObj, arr, 4).oddId)) ? null : bankers.push(String.fromCharCode(97 + index).toUpperCase())
                    : null

                return (
                    <div className="bs__item ">
                        <div className="bet-options">
                            {currentTab === 2
                                ? <Fragment>
                                    <div className="system-letter">{String.fromCharCode(97 + index).toUpperCase()}</div>
                                    <i className={
                                        "bs-icon-banker " + (this.props.state.betList.bankersArray.includes(getVal(TournamentsObj, arr, 4).oddId) === true
                                            ? "active"
                                            : ((systemTipSize(tournamentsCount(TournamentsBets, TournamentsObj, TournamentsObjLive)) - this.props.state.betList.bankersArray.length) === 1 || this.props.state.betList.systemRadioValue === 2) ? "lock" : ""
                                        )
                                    } onClick={(e) => this.handleBankerClick(e, getVal(TournamentsObj, arr, 4).oddId)}></i>
                                </Fragment>
                                : null}
                        </div>
                        <div className="bet-event">
                            <div className="row">
                                <div className="bet-event__title">
                                    {getVal(TournamentsObj, arr, 0).defaultName || (getVal(TournamentsObj, arr, 1).home + "-" + getVal(TournamentsObj, arr, 1).away)}
                                </div>
                                <div className="bs-options__option-odds">
                                    <span className="bs-options__odds-change"></span>
                                </div>
                                <div className="bet-close icon" onClick={() => this.props.dispatch({ type: 'DELETE_ODD', payload: getVal(TournamentsObj, arr, 4).oddId })}>
                                </div>
                            </div>
                            <div className="row space-between">
                                <div className="bet-event__market">{getVal(TournamentsObj, arr, 4).oddtagTr}</div>
                                <div className="bet-event__rate">{getVal(TournamentsObj, arr, 4).value}</div>
                            </div>
                            <div className="row space-between">
                                <div className="bet-event__team">{getVal(TournamentsObj, arr, 3).discriminator || getVal(TournamentsObj, arr, 3).betTitleName}</div>
                                <div className="bet-event__item-link"><span>
                                    +{(getVal(TournamentsObj, arr, 1).betdomains)
                                        ? getVal(TournamentsObj, arr, 1).betdomains.length
                                        : Object.values(getVal(TournamentsObj, arr, 1).groups).reduce((a, b) => { return a + b.Markets.length }, 0)}
                                </span></div>
                            </div>
                            {currentTab === 0 && this.props.state.betSlip.sameStake === false
                                ? <div className="row bet-event__stakes space-between">
                                    <div className="stake">
                                        <div className="bs__stake-name">Stake</div>
                                        <input className="bs__input" type="number" min="1" max="5000000"
                                            value={this.props.state.betList.variousStakeValue[getVal(TournamentsObj, arr, 4).oddId]}
                                            onChange={(e) => this.variousStakeHandleChange(e, getVal(TournamentsObj, arr, 4).oddId, getVal(TournamentsObj, arr, 4).value)}
                                        />
                                    </div>
                                    <div className="estwin">
                                        <div className="bs__stake-name">Est Win</div>
                                        <input className="bs__input" type="number" value={(this.props.state.betList.variousStakeValue[getVal(TournamentsObj, arr, 4).oddId] * getVal(TournamentsObj, arr, 4).value).toFixed(2) || 0} disabled />
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                );
            }
        });

        let lettersArr = [];
        let coefsCalcArr = [];

        // конвертация в буквы
        { [...Array((allOddsArray).length)].map((x, i) => lettersArr.push(String.fromCharCode(65 + i))) }

        systemCombinations(lettersArr, this.props.state.betList.systemRadioValue, bankers).map((val) => coefsCalcArr.push(coefsCalc(val, allOddsArray)));

        const calculateBet = () => {
            switch (currentTab) {
                case 0:
                    return (this.props.state.betSlip.sameStake === true)
                        ? (singlePossibleWinStake * this.props.state.betList.stakeValue).toFixed(2)
                        : isNaN(possibleWinVariousStake) ? "0.00" : (possibleWinVariousStake).toFixed(2);
                case 1: return (multiplePossibleWinStake * this.props.state.betList.stakeValue).toFixed(2);
                case 2: return totalSystemCoef(coefsCalcArr) * this.props.state.betList.stakeValue
            }
        };

        const calculateBonus = (currentTab !== 0) ? (Number(calculateBet()) / 100 * bonusAmount).toFixed(2) : 0;
        const betAmount = (Number(calculateBonus) + Number(calculateBet())).toFixed(2);

        let bankerOdds = TournamentsBets.filter((e) => this.props.state.betList.bankersArray.includes(e.oddId)).map((arr, index) => {
            if (TournamentsObj.find(e => e.tournament.tournamentId == arr.tournamentId)) {
                let obj = {};
                obj.oddTag = getVal(TournamentsObj, arr, 4).oddTag || getVal(TournamentsObj, arr, 4).oddtag;
                obj.oddValue = getVal(TournamentsObj, arr, 4).value.toFixed(2);
                obj.oddId = getVal(TournamentsObj, arr, 4).oddId;
                obj.oddSymbol = "";
                obj.matchId = getVal(TournamentsObj, arr, 3).matchId || getVal(TournamentsObj, arr, 1).matchId;
                return obj
            }
        });

        const requestBody = (numOfArray) => {
            let obj = {};

            let values = TournamentsBets.map((arr) => {
                let obj = {};

                if (arr.type === "prematch") {
                    if (TournamentsObj.find(e => e.tournament.tournamentId == arr.tournamentId)) {
                        obj.matchId = getVal(TournamentsObj, arr, 3).matchId || getVal(TournamentsObj, arr, 1).matchId;
                        obj.btrMatchId = getVal(TournamentsObj, arr, 1).btrMatchId || getVal(TournamentsObj, arr, 1).btrmatchid;
                        obj.tournamentId = getVal(TournamentsObj, arr, 1).tournamentId || getVal(TournamentsObj, arr, 1).touranmentId;
                        obj.isOutrightType = getVal(TournamentsObj, arr, 1).isOutrightType;
                        obj.betTitle = getVal(TournamentsObj, arr, 3).discriminator || getVal(TournamentsObj, arr, 3).betTitleName;
                        obj.betTitleType = getVal(TournamentsObj, arr, 3).betTitleType;
                        obj.odds = [
                            {
                                "value": getVal(TournamentsObj, arr, 4).value,
                                "id": getVal(this.props.state.tournamentsData, arr, 4).oddId,
                                "tag": getVal(TournamentsObj, arr, 4).oddTag || getVal(TournamentsObj, arr, 4).oddtag,
                            }]
                    }
                }
                if (arr.type === "live") {
                    if (Object.keys(TournamentsObjLive).some(e => e == arr.matchId)) {
                        obj.matchId = getValLive(TournamentsObjLive, arr, 0).matchid;
                        obj.btrMatchId = getValLive(TournamentsObjLive, arr, 0).btrmatchid;
                        obj.tournamentId = getValLive(TournamentsObjLive, arr, 0).tournamentId;
                        obj.isOutrightType = false;
                        obj.betTitle = getValLive(TournamentsObjLive, arr, 1).betTitle;
                        obj.betTitleType = getValLive(TournamentsObjLive, arr, 1).betTitleType;
                        obj.odds = [
                            {
                                "value": getValLive(TournamentsObjLive, arr, 2).value,
                                "id": getValLive(TournamentsObjLive, arr, 2).oddId,
                                "tag": getValLive(TournamentsObjLive, arr, 2).oddtag,
                            }]
                    }
                }
                return obj;
            });


            if (currentTab === 0) {
                let arr = TournamentsBets[numOfArray];
                let type = TournamentsBets[numOfArray].type;


                if (TournamentsObj.find(e => e.tournament.tournamentId == arr.tournamentId) || Object.keys(TournamentsObjLive).some(e => e == arr.matchId)) {
                    if (this.props.state.betSlip.sameStake === false) {
                        obj.stakeAmount = this.props.state.betList.variousStakeValue[arr.oddId];
                        if (type === "prematch") obj.totalProbability = (this.props.state.betList.variousStakeValue[arr.oddId] * getVal(TournamentsObj, arr, 4).value).toFixed(2);
                        if (type === "live") obj.totalProbability = (this.props.state.betList.variousStakeValue[arr.oddId] * getValLive(TournamentsObjLive, arr, 2).value).toFixed(2);
                    }
                    else {
                        obj.stakeAmount = this.props.state.betList.stakeValue;
                        if (type === "prematch") obj.totalProbability = getVal(TournamentsObj, arr, 4).value;
                        if (type === "live") obj.totalProbability = getValLive(TournamentsObjLive, arr, 2).value;
                    }
                }
                obj.values = [values[numOfArray]];
            }
            else {
                obj.stakeAmount = this.props.state.betList.stakeValue;
                obj.totalProbability = (currentTab === 1 || currentTab === 2) ? (currentTab === 1 ? multiplePossibleWinStake.toFixed(2) : totalSystemCoef(coefsCalcArr)) : "";
                obj.values = values;
            }
            obj.betType = (currentTab === 1 || currentTab === 2) ? (currentTab === 1 ? "cmb" : "sys") : "sng";
            obj.pageType = 0;
            obj.maxWin = betAmount;
            obj.minBet = minStake;
            if (currentTab !== 0) obj.bonusPercent = bonusAmount;
            if (currentTab !== 0) obj.bonusValue = calculateBonus;
            if (currentTab === 2) {
                obj.bankers = bankerOdds;
                obj.numberOfWinners = this.props.state.betList.systemRadioValue;
            }

            return obj;
        }

        const systemCombos = systemCombinations(lettersArr, this.props.state.betList.systemRadioValue, bankers)
        return (
            <div className="scroll-content">
                <div className="bs-list__wrapper">
                    {betSlipList}
                </div>

                {currentTab === 2
                    ? <SystemList systemTipSize={systemTipSize} bankersArrayLength={this.props.state.betList.bankersArray.length} coefsCalcArr={coefsCalcArr} systemCombos={systemCombos} totalSystemCoef={totalSystemCoef} TournamentsObj={TournamentsObj} />
                    : null}


                <div className="bs-footer">
                    <div className="bs-footer__summary">
                        <div className="row">
                            <div className="bs-footer__summary--title">Possible win:</div>
                            <div className="bs-footer__summary--total">
                                {betAmount} XAF
                            </div>
                        </div>
                        {currentTab !== 0
                            ? <div className="row">
                                <div className="bs-footer__summary--title">Bonus:</div>
                                <div className="bs-footer__summary--total">{calculateBonus} XAF</div>
                            </div>
                            : null}
                    </div>

                    {this.props.state.betSlip.advanced === true
                        ? <div className="bs-footer__advanced-area">
                            {currentTab !== 0
                                ? <Fragment>
                                    <div className="row">
                                        <div className="bs-footer__advanced-area--title">Total odds</div><div className="bs-footer__advanced-area--total">
                                            {(currentTab === 1) ? multiplePossibleWinStake.toFixed(2) : totalSystemCoef(coefsCalcArr)} XAF</div>
                                    </div>
                                </Fragment>
                                : null}
                            <div className="row">
                                <div className="bs-footer__advanced-area--title">Min Bet</div>
                                <div className="bs-footer__advanced-area--total">{minStake} XAF</div>
                            </div>
                            <div className="row">
                                <div className="bs-footer__advanced-area--title">Max Bet</div>
                                <div className="bs-footer__advanced-area--total">{maxStake} XAF</div>
                            </div>
                            <div className="row">
                                <div className="bs-footer__advanced-area--title">Max Win</div>
                                <div className="bs-footer__advanced-area--total">{maxWin} XAF</div>
                            </div>
                        </div>
                        : null}

                    {this.alertBox(minStake, maxStake)}

                    {this.props.state.betSlip.sameStake === true || currentTab > 0
                        ? <div className="bs__stake">
                            <div className="bs__stake--name">Stake</div>
                            <div className="bs__stake--input">
                                <input type="number" min="1" max="50000"
                                    value={this.props.state.betList.stakeValue}
                                    onChange={this.sameStakeHandleChange} />
                            </div>
                            <div className="bs__stake--currency">XAF</div>
                        </div>
                        : null}

                    <div className="bs-btn-block">
                        <div className="cell place-bet">
                            <button className="button btn-place-bet" onClick={(e) => this.onPlaceBet(e, requestBody, allOddsArray)}>Place Bet</button>
                        </div>
                    </div>
                    <div className="bs-btn-block bt">
                        <div className="cell">
                            <button className="button bs-btn--clear" onClick={(e) => this.onClear()}>Clear</button>
                        </div>
                        <div className="cell">
                            <button className="button bs-btn--save">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: {
            bsTabs: state.bsTabs,
            betList: state.betList,
            betSlip: state.betSlip,
            odds: state.odds,
            tournamentsData: state.tournamentsData,
            virtualOdds: state.virtualOdds,
            virtualTournamentsData: state.virtualTournamentsData,
            liveMatches: state.liveMatches,
        }
    }
}
export default connect(mapStateToProps)(withRouter(BSForm))
