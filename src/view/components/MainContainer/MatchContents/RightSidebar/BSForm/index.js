import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import {ticketAPI, saveTicketAPI, getLimitsAPI} from "config/constants";
import {readCookie} from 'view/Utils/Cookies';
import SystemList from './SystemList';
import BetSlipList from './BetSlipList';
import BSAlertBox from './BSAlertBox';
import {
    getVal, getValLive, totalSystemCoef, systemTipSize, getBonusAmount,
    coefsCalc, systemCombinations
} from './../BSLogic';
import {withRouter} from 'react-router-dom';

import 'view/styles/messages.css';

import {FormattedMessage} from "react-intl";
import {QuickBetButton} from "./QuickBetButton";


let getLimitsJSON;
let minStake, maxStake, maxWin, minCombination, maxCombination, maxOdd, maxSystemBet;

class BSForm extends PureComponent {
    state = {
        isVirtual: this.props.location.pathname.match(".*\/virtual.*"),
        singlePossibleWinStake: 0,
        possibleWinVariousStake: 0,
        multiplePossibleWinStake: 0,
        onSameStakeChange: false,
        errorResponse: false,
        errorCode: false,
        alertState: true,
        placeBet2addFunds: false,
        removeBetMarketId: false,
        placeBetPreloader: false,
        savePreloader: false,
        buttonsLock: false,
        disabledSave: false,
        sendRequestMethod: false,
        trigger:true
    }



    componentDidMount() {

        setInterval(
            () => {
                console.log(this.state.trigger)
               this.setState({trigger:true})
            },
            10000);

        const requestLimits = async () => {
            const response = await fetch(getLimitsAPI);
            const getLimitsJSON = await response.json();

            switch (this.props.state.betSlip.currentTab) {
                case 0:
                    minStake = getLimitsJSON.response.single.minStakeSingleBet;
                    maxStake = getLimitsJSON.response.single.maxStakeSingleBet;
                    maxWin = getLimitsJSON.response.single.maxWinSingleBet;
                    break;
                case 1:
                    minStake = getLimitsJSON.response.multiple.minStakeCombiBet;
                    maxStake = getLimitsJSON.response.multiple.maxStakeCombi;
                    maxWin = "5000000.00";
                    minCombination = getLimitsJSON.response.multiple.minCombination;
                    maxCombination = getLimitsJSON.response.multiple.maxCombination;
                    break;
                case 2:
                    minStake = getLimitsJSON.response.system.minStakeSystemBet;
                    maxStake = getLimitsJSON.response.system.maxStakeSystemBet;
                    maxWin = getLimitsJSON.response.system.maxWinSystemBet;
                    maxOdd = getLimitsJSON.response.system.maxOdd;
                    maxSystemBet = getLimitsJSON.response.system.maxSystemBet;
                    break;
            }
        }
        requestLimits();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let disabeSave = this.props.TournamentsBets.map(e => e.type).some(e => !(e === "prematch"));
            this.setState({disabledSave: disabeSave})
        }
        if(prevProps.state.betList.matchObj.length!==this.props.state.betList.matchObj.length){
            this.setState({trigger:true})
        }
        if(prevProps.state.betList.bankersArray.length!==this.props.state.betList.bankersArray.length){
            this.setState({trigger:true})
        }
    }


    /*jshint ignore:start*/

    /*eslint-disable*/
    static getDerivedStateFromProps(props, state) {
        const getBetsArray = props.TournamentsBets.map((arr) => {
            let tournamentsData = props.TournamentsObj;

            if (tournamentsData.find(e => e.tournament.tournamentId === arr.tournamentId))
                return getVal(tournamentsData, arr, 4).oddId
        })

        props.state.betList.bankersArray.map(e => {
            let checkBanker = props.state.betList.matchObj.findIndex(el => {
                return e === el.OddId
            });
            if (checkBanker === -1) {
                props.dispatch({type: 'BANKERS_ARRAY_REMOVE', payload: e})
            }

        })

        return {
            ...state,
        }
    }

    /*eslint-enable*/
    /*jshint ignore:end*/
    setMinBonusStake = (props) => {
        this.setState({onSameStakeChange: true})
        this.props.dispatch({type: 'SAME_STAKE', payload: props})
        this.setState({errorResponse: false})
    }

    clearFaultCode = () => {
        this.setState({errorResponse: false})
    }

    sameStakeChange = (event) => {
        this.props.dispatch({ type: 'SAME_STAKE', payload: event.target.value.replace(/^0+(?!\.|$)/, '').replace(/\D/g,'') })
        this.setState({ onSameStakeChange: true })
    }

    sendRequest = (requestBody, allOddsArray, currentTab, method) => {
        const accessToken = readCookie('token');
        if (currentTab !== 0) allOddsArray = [1];
        this.setState({buttonsLock: true});

        if (method === "place")
            this.setState({placeBetPreloader: true});
        else if (method === "save")
            this.setState({savePreloader: true});

        allOddsArray.map(async (e, index) => {
            // console.log('JSON.stringify(requestBody(index)) :', JSON.stringify(requestBody(index)));
            let url;

            if (method === "place") url = ticketAPI;
            else if (method === "save") url = saveTicketAPI;

            let requestBodyObj = requestBody(index);

            // TODO: проверить баланс перед отправкой запроса и сразу вывести ошибку если не хватает

            const makeRequest = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": (method === "place") ? accessToken : ""
                },
                body: JSON.stringify(requestBodyObj)
            })
            const answer = await makeRequest.json();
            const result = await answer;
            // console.log('answer :', result);

            /*                 const result = {
                                "ok": false,
                                "response": {
                                    "matchId": null,
                                    "betRadarMatchId": null,
                                    "oddId": null,
                                    "betMarketId": null,
                                    "errors": [],
                                    "faultCode": 156,
                                    "faultInfo": {
                                        "code": 156,
                                        "message": "Bet cannot be placed using bonus balance, cause it does not qualify for conditions.",
                                        "parameters": {
                                            "parameter": []
                                        }
                                    },
                                    "message": null
                                },
                                "errors": [{
                                    "message": null,
                                    "htmlMessage": null
                                }]
                            }  */

            /*             const result = {
                            "ok": false,
                            "response": {
                                "matchId": null,
                                "betRadarMatchId": null,
                                "oddId": null,
                                "betMarketId": null,
                                "problemOdds": null,
                                "minBonusStake": null,
                                "errors": [],
                                "faultCode": 229,
                                "faultInfo": {
                                    "code": 229,
                                    "message": "Match in State BetStop , matchId : -34968283694236840",
                                    "parameters": {
                                        "parameter": []
                                    }
                                },
                                "message": null
                            },
                            "errors": [{
                                "message": null,
                                "htmlMessage": null
                            }]
                        }

             */

            /*             const result = {
                            "ok": false,
                            "response": {
                                "betMarketId": 4831891,
                                "matchId": 766868,
                                "betRadarMatchId": null,
                                "oddId": null,
                                "errors": ["Need remove market in hub with URI \"/hub/rest/match/removeMarket\""],
                                "faultCode": 216,
                                "faultInfo": {
                                    "code": 216,
                                    "message": "{\"betmarket_status\":1,\"betmarketid\":4831891,\"message\":\"Market with ID 4831891nullcurrently not visible in betoffer. Market status:1. Ticket not accepted:0027160001340\",\"matchid\":766868}",
                                    "parameters": {
                                        "parameter": []
                                    }
                                },
                                "message": null
                            },
                            "errors": [{
                                "message": null,
                                "htmlMessage": null
                            }]
                        }

                        /*  const result = {
                            "ok": false,
                            "response": {
                                "oddId": "66373815",
                                "matchId": "620476",
                                "betRadarMatchId": null,
                                "errors": [
                                    "Match not active for odd 66373815. Ticket not accepted. BetDomain:null   0027160001205"
                                ],
                                "faultCode": 230,
                                "faultInfo": {
                                    "code": 230,
                                    "message": "{\"message\":\"Match not active for odd 66373815. Ticket not accepted. BetDomain:null   0027160001205\",\"matchid\":620476,\"match_state\":4}",
                                    "parameters": {
                                        "parameter": []
                                    }
                                },
                                "message": null
                            },
                            "errors": [
                                {
                                    "message": null,
                                    "htmlMessage": null
                                }
                            ]
                        }  */

            /*              const result = {
                            "ok": false,
                            "response": {
                                "matchId": null,
                                "betRadarMatchId": null,
                                "oddId": null,
                                "errors": [],
                                "faultCode": 154,
                                "faultInfo": {
                                    "code": 154,
                                    "message": "Cannot use bonus balance before deposit.",
                                    "parameters": {
                                        "parameter": []
                                    }
                                },
                                "message": null
                            },
                            "errors": [{
                                "message": null,
                                "htmlMessage": null
                            }]
                        }  */


            /*          const result = {
                         "ok": false,
                         "response": {
                             "matchId": null,
                             "betRadarMatchId": null,
                             "oddId": null,
                             "betMarketId": null,
                             "problemOdds": null,
                             "minBonusStake": "50.0",
                             "errors": [
                                 "Stake below minimum bonus stake"
                             ],
                             "faultCode": 159,
                             "faultInfo": {
                                 "code": 159,
                                 "message": "{\"msg\":\"Bet cannot be placed using bonus balance, cause stake less then minimum bonus stake.\",\"min_bonus_stake\":50.00}",
                                 "parameters": {
                                     "parameter": []
                                 }
                             },
                             "message": null
                         },
                         "errors": [
                             {
                                 "message": null,
                                 "htmlMessage": null
                             }
                         ]
                     }  */

            /*
                        const result = {
                            "ok": false,
                            "response": {
                                "matchId": null,
                                "betRadarMatchId": null,
                                "oddId": null,
                                "betMarketId": null,
                                "problemOdds": [{
                                    "oddid": 73955617,
                                    "requestedOddsValue": 3.14,
                                    "serverOddsValue": 2.22
                                },
                                {
                                    "oddid": 73956463,
                                    "requestedOddsValue": 1.18,
                                    "serverOddsValue": 3.33
                                }],
                                "minBonusStake": null,
                                "errors": ["Need update odd in hub with URI \"/hub/rest/updateOdd\""],
                                "faultCode": 217,
                                "faultInfo": {
                                    "code": 217,
                                    "message": "[{\"oddid\":67958611,\"requestedOddsValue\":2.48,\"serverOddsValue\":2.10},{\"oddid\":67958432,\"requestedOddsValue\":2.18,\"serverOddsValue\":2.00}]",
                                    "parameters": {
                                        "parameter": []
                                    }
                                },
                                "message": null
                            },
                            "errors": [{
                                "message": null,
                                "htmlMessage": null
                            }]
                        }
            */

            if (result.ok) {
                setTimeout(
                    () => {
                        this.onClearBetSlip();
                        this.props.setState({
                            betDone: true,
                            betDoneInfo: result.response,
                            requestMethod: method
                        })
                        this.setState({
                            errorResponse: false,
                            placeBetPreloader: false,
                            savePreloader: false,
                            buttonsLock: false,
                        })
                    },
                    1200);
            } else {
                setTimeout(
                    () => {
                        console.log('result.response :', result.response);
                        if (typeof result.response !== "undefined")
                        // message.error(result.response.faultInfo.message, 4);
                            console.log('message.error  :', result.response);

                        if (typeof answer.message !== "undefined")
                            this.setState({errorResponse: answer.status})

                        if (result.response && result.response.faultCode !== undefined) {
                            this.setState({errorResponse: result.response})
                        }
                        if (!result.ok && Array.isArray(result.errors) && result.errors.length > 0) {
                            this.setState({errorResponse: result.errors})
                        }
                        this.setState({
                            buttonsLock: false,
                            placeBetPreloader: false,
                            savePreloader: false,
                        });
                    },
                    1200);
            }
            // console.log('answer Error (status):', answer.status);
            // console.log('answer Error (error):', answer.error);
            // console.log('answer Error (message):', answer.message);

            // console.log(Array.of(...Object.values(result)));
            /*             message.loading('Please wait...', 1)
                            .then(() => {
                                if (result.ok) {
                                    message.success("Your bet is accepted. Good luck!", 4);
                                    this.onClearBetSlip();
                                    this.props.setBetDoneState({ betDone: true })
                                    this.props.setBetDoneInfo({ betDoneInfo: result.response })
                                    this.setState({ errorResponse: false })
                                }
                                else {
                                    console.log('result.response :', result.response);
                                    if (typeof result.response !== "undefined")
                                        message.error(result.response.faultInfo.message, 4);
                                    if (typeof answer.message !== "undefined")
                                        message.error(answer.message, 4);
                                    // console.log('answer Error (status):', answer.status);
                                    // console.log('answer Error (error):', answer.error);
                                    // console.log('answer Error (message):', answer.message);

                                    if (typeof result.response !== "undefined" && result.response.faultCode !== "undefined") {
                                        this.setState({ errorResponse: result.response })
                                    }
                                }
                            })
                            .then(() => {
                                this.setState({ buttonsLock: false });
                            }) */
        })
    };

    onSendBet = (requestBody, allOddsArray, method) => {
        if (method && method !== this.state.method)
            this.setState({sendRequestMethod: method})
        if ((this.props.state.isAuthenticated && method === "place") || method === "save")
            this.sendRequest(requestBody, allOddsArray, this.props.state.betSlip.currentTab, method)
    }

    onClearBetSlip = () => {
        if (!this.state.isVirtual) {
            this.props.dispatch({type: 'CLEAR_BETLIST'});
            this.props.dispatch({type: 'CLEAR_ODD_LIST'})
        } else {
            this.props.dispatch({type: 'CLEAR_VIRTUAL_BETLIST'});
            this.props.dispatch({type: 'CLEAR_VIRTUAL_ODD_LIST'})
        }
    }

    onSetWinStake = (singlePossibleWinStake, multiplePossibleWinStake, possibleWinVariousStake) => {
        if (this.state.possibleWinVariousStake !== possibleWinVariousStake) this.setState({possibleWinVariousStake: possibleWinVariousStake})
        if (this.state.singlePossibleWinStake !== singlePossibleWinStake) this.setState({singlePossibleWinStake: singlePossibleWinStake})
        if (this.state.multiplePossibleWinStake !== multiplePossibleWinStake) this.setState({multiplePossibleWinStake: multiplePossibleWinStake})
    }
    onSendSameStakeChange = (props) => {
        if (this.state.onSameStakeChange !== props) this.setState({onSameStakeChange: props})
    }

    //TODO: Remake AlertBox func for minStake and maxStake
    /*
        alertBox = (minStake, maxStake) => {
        let val, showMessage;
        if ((this.props.state.betSlip.sameStake === true && this.props.state.betSlip.currentTab === 0) || this.props.state.betSlip.currentTab !== 0) {
            val = Number(this.props.state.betList.stakeValue);
        }
        else {
            // val = 200;
        }
        if (val < minStake) showMessage = "Your stake is below minimum. Enter valid stake";
        if (val > maxStake) showMessage = "Your stake is above maximum. Defaulting to maximum";
        if (showMessage) return (<div className="bs__limit-message"><div><i className="alert"></i>{showMessage}</div></div>);
    }; */

toggleTrigger = ()=>{
    this.setState({trigger:true});
}

    render() {
        const {betList, betSlip} = this.props.state;
        let currentTab = betSlip.currentTab;
        const {possibleWinVariousStake, singlePossibleWinStake, multiplePossibleWinStake} = this.state;
        const {allOddsArray, lettersArr, coefsCalcArr} = betList;
        let bankers = [];

        let bonusAmount = (betList.tipSize > 1 && getLimitsJSON) ? getBonusAmount(betList.tipSize, getLimitsJSON) : "0";

        let minBet = (currentTab !== 0) ? minStake : minStake * betList.tipSize;

        let systemCombos = [];
        if (currentTab === 2 && this.state.trigger === true) {

            systemCombos = systemCombinations(betList.lettersArr, betList.systemRadioValue, betList.bankersArray, betList.matchObj);
            coefsCalcArr.splice(0, coefsCalcArr.length);
            systemCombos.map((val) => coefsCalcArr.push(coefsCalc(val, allOddsArray)));
            this.setState({trigger:false})
        }


        const calculateBet = () => {
            switch (currentTab) {
                case 0:
                    return (betSlip.sameStake === true)
                        ? (singlePossibleWinStake * betList.stakeValue).toFixed(2)
                        : isNaN(possibleWinVariousStake) ? "0.00" : (possibleWinVariousStake).toFixed(2);
                case 1:
                    return (multiplePossibleWinStake * betList.stakeValue).toFixed(2);
                case 2:
                    return totalSystemCoef(coefsCalcArr) * betList.stakeValue // TODO: add totalSystemCoef
            }
        };

        const calculateBonus = (currentTab !== 0) ? (Number(calculateBet()) / 100 * bonusAmount).toFixed(2) : 0;
        const betAmount = (Number(calculateBonus) + Number(calculateBet())).toFixed(2);

        let bankerOdds = this.props.TournamentsBets.filter((e) => betList.bankersArray.includes(e.oddId)).map((arr) => {
            if (this.props.TournamentsObj.find(e => e.tournament.tournamentId === arr.tournamentId)) {
                let obj = {};
                obj.oddTag = getVal(this.props.TournamentsObj, arr, 4).oddTag || getVal(this.props.TournamentsObj, arr, 4).oddtag;
                obj.oddValue = getVal(this.props.TournamentsObj, arr, 4).value.toFixed(2);
                obj.oddId = getVal(this.props.TournamentsObj, arr, 4).oddId;
                obj.oddSymbol = "";
                obj.matchId = getVal(this.props.TournamentsObj, arr, 3).matchId || getVal(this.props.TournamentsObj, arr, 1).matchId;
                return obj;
            }
        });

        const requestBody = (numOfArray) => {
            let obj = {};
            let pageType = [];

            let values = this.props.TournamentsBets.map((arr, index) => {
                let matchObj = this.props.state.betList.matchObj[index];
                let obj = {};
                if (this.state.isVirtual) {
                    if (matchObj && matchObj.hasOwnProperty("Test")) {
                        obj.matchId = matchObj.MatchId;
                        obj.btrMatchId = matchObj.BtrMatchId;
                        // obj.tournamentId = matchObj.TournamentId;
                        obj.isOutrightType = matchObj.IsOutrightType;
                        obj.betTitle = matchObj.discriminator;
                        obj.betTitleType = matchObj.BetTitleType;
                        obj.odds = matchObj.Odds;
                    }
                } else {
                    if (arr.type === "prematch") {
                        if (matchObj && matchObj.hasOwnProperty("Test")) {
                            obj.matchId = matchObj.MatchId;
                            obj.btrMatchId = matchObj.BtrMatchId;
                            // obj.tournamentId = matchObj.TournamentId;
                            obj.isOutrightType = matchObj.IsOutrightType;
                            obj.betTitle = matchObj.BetTitle;
                            obj.betTitleType = matchObj.BetTitleType;
                            obj.odds = matchObj.Odds;
                        }
                    }
                    if (arr.type === "live") {
                        if (matchObj && matchObj.hasOwnProperty("Test")) {
                            obj.matchId = matchObj.MatchId;
                            obj.btrMatchId = matchObj.BtrMatchId;
                            // obj.tournamentId = matchObj.TournamentId;
                            obj.isOutrightType = false;
                            obj.betTitle = matchObj.BetTitle;
                            obj.betTitleType = matchObj.BetTitleType;
                            obj.odds = matchObj.Odds;
                        }
                    }
                }
                return obj;
            });

            if (currentTab === 0 && this.props.TournamentsBets[numOfArray]) {
                let arr = this.props.TournamentsBets[numOfArray];
                let type = this.props.TournamentsBets[numOfArray].type;

                if (this.props.TournamentsObj.find(e => e.tournament.tournamentId === arr.tournamentId) || Object.keys(this.props.TournamentsObjLive).some(e => e === arr.matchId)) {
                    (betSlip.sameStake === false)
                        ? obj.stakeAmount = betList.variousStakeValue[arr.oddId]
                        : obj.stakeAmount = betList.stakeValue;

                    if (type === "prematch") obj.totalProbability = getVal(this.props.TournamentsObj, arr, 4).value;
                    if (type === "live") obj.totalProbability = getValLive(this.props.TournamentsObjLive, arr, 2).value;
                    if (this.state.isVirtual) obj.totalProbability = getVal(this.props.TournamentsObj, arr, 4).value;
                }
                obj.values = [values[numOfArray]];
            } else {
                obj.stakeAmount = betList.stakeValue;
                obj.totalProbability = (currentTab === 1 || currentTab === 2) ? (currentTab === 1 ? multiplePossibleWinStake.toFixed(2) : totalSystemCoef(coefsCalcArr)) : "";
                obj.values = values;
            }
            obj.betType = (currentTab === 1 || currentTab === 2) ? (currentTab === 1 ? "cmb" : "sys") : "sng";
            obj.maxWin = betAmount;
            obj.minBet = minBet;

            this.props.TournamentsBets.map((item, i, arr) => {
                if (!pageType.includes(this.props.TournamentsBets[i].type))
                    pageType.push(this.props.TournamentsBets[i].type)
            })

            if (!this.state.isVirtual) {
                if (pageType.includes("prematch") && !pageType.includes("live")) obj.pageType = "0";
                if (pageType.includes("live") && !pageType.includes("prematch")) obj.pageType = "1";
                if (pageType.includes("live") && pageType.includes("prematch")) obj.pageType = "2";
            } else {
                obj.pageType = "10";
            }

            (currentTab !== 0) ? obj.bonusPercent = 1 + (bonusAmount / 100) : obj.bonusPercent = "1.00";
            if (currentTab !== 0) obj.bonusValue = calculateBonus;
            if (currentTab === 2) {
                obj.bankers = bankerOdds;
                obj.numberOfWinners = betList.systemRadioValue;
            }
            return obj;
        }
        /*  let systemCombos = [];
          {
              currentTab === 2
                  ? systemCombos = systemCombinations(betList.lettersArr, betList.systemRadioValue, betList.bankersArray, betList.matchObj) : systemCombos = []
          }*/
        // const systemCombos = systemCombinations(betList.lettersArr, betList.systemRadioValue, betList.bankersArray,betList.matchObj);
        //const systemCombos = [];

        let quickBetEnabled = false;
        if (Array.isArray(this.state.errorResponse)) {
            this.state.errorResponse.map((errObj, index) => {
                if (errObj.code === "enough_money_for_lower_rate" || errObj.code === "not_enough_money") {
                    quickBetEnabled = true;
                    return false;
                }
            });
        }

        const {isVirtual, onSameStakeChange, buttonsLock} = this.state;
        return (
            <div className="scroll-content">
                <div className="bs-list__wrapper">
                    <BetSlipList
                        isVirtual={isVirtual}
                        onSameStakeChange={onSameStakeChange}
                        onSetWinStake={(singlePossibleWinStake, multiplePossibleWinStake, possibleWinVariousStake) => this.onSetWinStake(singlePossibleWinStake, multiplePossibleWinStake, possibleWinVariousStake)}
                        errorResponse={this.state.errorResponse}
                        onSendSameStakeChange={(props) => this.onSendSameStakeChange(props)}
                        buttonsLock={buttonsLock}
                        sendState={(keyState, state) => this.setState({[keyState]: state})}

                    />
                </div>

                {currentTab === 2
                    ? <SystemList systemTipSize={systemTipSize} bankersArrayLength={betList.bankersArray.length}
                                  coefsCalcArr={coefsCalcArr} systemCombos={systemCombos}
                                  totalSystemCoef={totalSystemCoef} TournamentsObj={this.props.TournamentsObj}
                                  toggleTrigger={this.toggleTrigger}

                    />
                    : null}


                <div className="bs-footer">
                    <div className="bs-footer__summary">
                        {currentTab !== 0
                            ? <div className="row">
                                <div className="bs-footer__summary--title">
                                    <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.TotalOdds"}
                                                      defaultMessage={"Total odds"}/>:
                                </div>
                                <div
                                    className="bs-footer__summary--total">{(currentTab === 1) ? multiplePossibleWinStake.toFixed(2) : totalSystemCoef(coefsCalcArr)}</div>
                            </div>
                            : null}
                        <div className="row">
                            <div className="bs-footer__summary--title">
                                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.PossibleWin"}
                                                  defaultMessage={"Possible win"}/>:
                            </div>
                            <div
                                className="bs-footer__summary--total">{betAmount} {this.props.state.userData.currency ? this.props.state.userData.currency :
                                <FormattedMessage id="Global.Currency" defaultMessage="XAF"/>}</div>
                        </div>
                        {currentTab !== 0
                            ? <div className="row">
                                <div className="bs-footer__summary--title">
                                    <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.Bonus"}
                                                      defaultMessage={"Bonus"}/>:
                                </div>
                                <div
                                    className="bs-footer__summary--total">{calculateBonus} {this.props.state.userData.currency ? this.props.state.userData.currency :
                                    <FormattedMessage id="Global.Currency" defaultMessage="XAF"/>}</div>
                            </div>
                            : null}
                    </div>

                    {betSlip.advanced &&
                    <div className="bs-footer__advanced-area">
                        <div className="row">
                            <div className="bs-footer__advanced-area--title">
                                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.MinBet"}
                                                  defaultMessage={"Min Bet"}/>
                            </div>
                            <div
                                className="bs-footer__advanced-area--total">{minBet} {this.props.state.userData.currency ? this.props.state.userData.currency :
                                <FormattedMessage id="Global.Currency" defaultMessage="XAF"/>}</div>
                        </div>
                        <div className="row">
                            <div className="bs-footer__advanced-area--title">
                                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.MaxBet"}
                                                  defaultMessage={"Max Bet"}/>
                            </div>
                            <div
                                className="bs-footer__advanced-area--total">{maxStake} {this.props.state.userData.currency ? this.props.state.userData.currency :
                                <FormattedMessage id="Global.Currency" defaultMessage="XAF"/>}</div>
                        </div>
                        <div className="row">
                            <div className="bs-footer__advanced-area--title">
                                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.MaxWin"}
                                                  defaultMessage={"Max Win"}/>
                            </div>
                            <div
                                className="bs-footer__advanced-area--total">{maxWin} {this.props.state.userData.currency ? this.props.state.userData.currency :
                                <FormattedMessage id="Global.Currency" defaultMessage="XAF"/>}</div>
                        </div>
                    </div>
                    }

                    {(betSlip.sameStake || currentTab > 0) &&
                        <div className="bs__stake">
                            <div className="bs__stake--name">
                                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.Stake"} defaultMessage={"Stake"} />
                            </div>
                            <div className="bs__stake--input">
                                <input 
                                    type="text"
                                    value={betList.stakeValue}
                                    onChange={this.sameStakeChange}
                                    placeholder="0"
                                    maxLength="6"
                                    />
                            </div>
                            <div className="bs__stake--currency"> {this.props.state.userData.currency?this.props.state.userData.currency:<FormattedMessage id="Global.Currency" defaultMessage="XAF" />}</div>
                        </div>
                    
                    }

                    {
                        (this.state.errorResponse.faultCode || !this.props.state.isAuthenticated)
                        &&
                        <BSAlertBox
                            errorResponse={this.state.errorResponse}
                            clearFaultCode={() => this.clearFaultCode()}
                            placeBet={() => this.onSendBet(requestBody, allOddsArray, this.state.method)}
                            isAuthenticated={this.props.state.isAuthenticated}
                            setMinBonusStake={(props) => this.setMinBonusStake(props)}
                        />
                    }

                    {
                        (Array.isArray(this.state.errorResponse))
                        && this.state.errorResponse.map(
                            (errObj, index) => {
                                return (
                                    <BSAlertBox
                                        errorResponse={errObj}
                                        clearFaultCode={() => this.clearFaultCode()}
                                        placeBet={() => this.onSendBet(requestBody, allOddsArray, "place")}
                                        isAuthenticated={this.props.state.isAuthenticated}
                                        setMinBonusStake={(props) => this.setMinBonusStake(props)}
                                    />
                                );
                            }
                        )
                    }
                    {
                        // console.log(requestBody(this.props.state.betList.allOddsArray))
                    }
                    <div className="bs-btn-block">
                        <div className="cell place-bet">
                            <QuickBetButton
                                stake={betList.stakeValue}
                                odds={allOddsArray}
                                requestBody={this.props.state.isAuthenticated ? requestBody(this.props.state.betList.allOddsArray) : null}
                            />

                            {/*visible={(quickBetEnabled && this.props.state.isAuthenticated) || true TODO: remove TRUE}*/}

                            {(this.state.errorResponse.faultCode === 154)
                                ?
                                <button
                                    disabled={buttonsLock}
                                    className="button add-funds"
                                    onClick={() => this.props.history.push('/profile/mywallet')}
                                >
                                    <FormattedMessage id=
                                                          {"MainContainer.MatchContents.RightSidebar.BSForm.Button.AddFunds"}
                                    />
                                </button>
                                :
                                <button
                                    disabled={buttonsLock || !this.props.state.isAuthenticated}
                                    className={"button btn-place-bet" + (this.state.placeBetPreloader ? " loading__icon" : "")}
                                    onClick={
                                        (!this.props.buttonsLock) ? () => this.onSendBet(requestBody, allOddsArray, "place") : null}>
                                    {(!this.state.placeBetPreloader &&
                                        <FormattedMessage id=
                                                              {"MainContainer.MatchContents.RightSidebar.BSForm.Button.PlaceBet"}
                                        />)}
                                </button>
                            }
                        </div>
                    </div>
                    <div className="bs-btn-block bt">
                        <div className="cell">
                            <button className="button bs-btn--clear" onClick={() => this.onClearBetSlip()}>
                                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.Button.Clear"}
                                                  defaultMessage={"Clear"}/></button>
                        </div>
                        <div className="cell">
                            <button
                                className={"button bs-btn--save" + (this.state.savePreloader ? " loading__icon" : "")}
                                disabled={this.state.disabledSave || buttonsLock}
                                onClick={(!this.props.buttonsLock) ? () => this.onSendBet(requestBody, allOddsArray, "save") : null}>
                                {(!this.state.savePreloader &&
                                    <FormattedMessage
                                        id={"MainContainer.MatchContents.RightSidebar.BSForm.Button.Save"}/>
                                )}
                            </button>
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
            isAuthenticated: state.isAuthenticated,
            betList: state.betList,
            betSlip: state.betSlip,
            userData: state.userData.currentUserData
        }
    }
}
export default connect(mapStateToProps)(withRouter(BSForm))
