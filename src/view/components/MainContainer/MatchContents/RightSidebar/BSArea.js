import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';

import CheckboxControls from './CheckboxControls';
import BetSlipEmpty from './BetSlipEmpty';
import CouponCheck from './CouponCheck';
import BetSlipMessageBox from './BetSlipMessageBox';
import BSForm from './BSForm';
import BSTabs from './BSTabs';

import { getVal, getValLive, coefsCalc, systemCombinations } from './BSLogic';
import { FormattedMessage } from "react-intl";

let TournamentsBets, TournamentsObjLive, TournamentsObj, systemRadioValue, allOddsArray, tipSize;
// let bankers = [];

class BSArea extends PureComponent {
    state = {
        isVirtual: this.props.location.pathname.match(".*\/virtual.*"),
        currentTab: this.props.state.betSlip.currentTab,
        betDone: false,
        betDoneInfo: {},
        requestMethod: false,
    }


    static getDerivedStateFromProps(props, state) {

        if (state.betDone && props.state.betList.tipSize > 0)
            return { betDone: false }

        if (state.isVirtual) {
            TournamentsBets = props.state.virtualOdds;
            TournamentsObj = props.state.virtualTournamentsData;
            TournamentsObjLive = "";
        } else {
            TournamentsBets = props.state.odds;
            TournamentsObj = props.state.tournamentsData;
            TournamentsObjLive = props.state.liveMatches;
        }
        systemRadioValue = props.state.betList.systemRadioValue;
        allOddsArray = props.state.betList.allOddsArray;

        // if (systemRadioValue !== state.prevSystemRadioValue || JSON.stringify(TournamentsBets) !== JSON.stringify(state.prevOdds)) {
        //     let coefsCalcArr = [];

        //     systemCombinations(props.state.betList.lettersArr, systemRadioValue, bankers).map((val) => coefsCalcArr.push(coefsCalc(val, allOddsArray)));
        //     props.dispatch({ type: 'COEFS_CALC_ARR', payload: coefsCalcArr })
        //     return {...state, prevSystemRadioValue: systemRadioValue}
        // }

        tipSize = Object.keys(TournamentsBets).length;
        if (tipSize !== state.prevTipSize) {
            props.dispatch({ type: 'TIP_SIZE', payload: tipSize })
            return {
                prevTipSize: Object.keys(TournamentsBets).length,
            }
        }

        if (TournamentsBets.length !== 0 && ((JSON.stringify(TournamentsBets) !== JSON.stringify(state.prevOdds)
            || JSON.stringify(TournamentsObj) !== JSON.stringify(state.prevTournamentsObj)
            || JSON.stringify(TournamentsObjLive) !== JSON.stringify(state.prevTournamentsObjLive)))) {
            let lettersArr = [];
            let allOddsArray = [];
            let tournamentsCount = [];
            let matchObjArr = [];
            TournamentsBets.map((arr) => {

                if (state.isVirtual) {
                    if (TournamentsObj.some(e => e.tournament.tournamentId === arr.tournamentId)) {
                        let matchObj = {};
                        let getVal0 = getVal(TournamentsObj, arr, 0);
                        let getVal1 = getVal(TournamentsObj, arr, 1);
                        let getVal3 = getVal(TournamentsObj, arr, 3);
                        let getVal4 = getVal(TournamentsObj, arr, 4);

                        matchObj.Test = TournamentsObj.some(e => e.tournament.tournamentId === arr.tournamentId);
                        matchObj.Value = getVal4.value;
                        matchObj.OddId = getVal4.oddId;
                        matchObj.Oddtag = getVal4.oddtagTr;
                        matchObj.defaultName = getVal0.defaultName;
                        matchObj.BetTitle = getVal3.discriminator;
                        matchObj.BetdomainsLength = getVal1.betdomains.length;
                        matchObj.DeleteOdd = "DELETE_VIRTUAL_ODD";
                        matchObj.betMarketId = getVal3.betDomainId;
                        matchObj.Competitors = getVal1.matchtocompetitors;
                        matchObj.SportId = getVal0.sport.sportId;
                        matchObj.information = getVal4.information;
                        matchObj.status = getVal1.liveBetStatus;
                        // for PlaceBet request
                        matchObj.MatchId = getVal3.matchId;
                        matchObj.BtrMatchId = getVal1.btrMatchId;
                        matchObj.TournamentId = getVal1.tournamentId;
                        matchObj.IsOutrightType = getVal1.isOutrightType;
                        matchObj.BetTitleType = getVal3.betTitleType;
                        matchObj.Odds = [{
                                "value": getVal4.value,
                                "id": getVal4.oddId,
                                "tag": getVal4.oddTag,
                            }]

                        if (!tournamentsCount.includes(getVal4.betdomainId)) tournamentsCount.push(getVal4.betdomainId);
                        allOddsArray.push(parseFloat(getVal4.value));
                        matchObjArr.push(matchObj);
                    }
                } else {
                    if (arr.type === "prematch" && TournamentsObj.find(e => e.tournament.tournamentId === arr.tournamentId)) {
                        let matchObj = {};
                        // console.log('aaaaaarrrrrrr :', arr);
                        let getVal1 = getVal(TournamentsObj, arr, 1);
                        let getVal3 = getVal(TournamentsObj, arr, 3);
                        let getVal4 = getVal(TournamentsObj, arr, 4);

                        matchObj.Test = TournamentsObj.some(e => e.tournament.tournamentId === arr.tournamentId);
                        matchObj.Value = getVal4.value;
                        matchObj.OddId = getVal4.oddId;
                        matchObj.Oddtag = getVal4.oddtagTr;
                        matchObj.Home = getVal1.home;
                        matchObj.Away = getVal1.away;
                        matchObj.BetTitle = getVal3.betTitleName;
                        matchObj.betMarketId = getVal3.id;
                        matchObj.BetdomainsLength = getVal1.groups.reduce((a, b) => { return a + b.Markets.length }, 0);
                        matchObj.DeleteOdd = "DELETE_ODD";
                        // for PlaceBet request
                        matchObj.MatchId = getVal1.matchId;
                        matchObj.BtrMatchId = getVal1.btrmatchid;
                        matchObj.TournamentId = getVal1.tournamentId;
                        matchObj.IsOutrightType = getVal1.isOutrightType;
                        matchObj.BetTitleType = getVal3.betTitleType;
                        matchObj.Odds = [{
                                "value": getVal4.value,
                                "id": getVal4.oddId,
                                "tag": getVal4.oddTag || getVal4.oddtag,
                            }]

                        if (!tournamentsCount.includes(getVal3.id)) tournamentsCount.push(getVal3.id);
                        allOddsArray.push(parseFloat(getVal4.value));
                        matchObjArr.push(matchObj);
                    }
                    if (arr.type === "live" && Object.keys(TournamentsObjLive).some(e => e === arr.matchId)) {
                        let matchObj = {};
                        
                        let getValLive0 = getValLive(TournamentsObjLive, arr, 0);
                        let getValLive1 = getValLive(TournamentsObjLive, arr, 1);
                        let getValLive2 = getValLive(TournamentsObjLive, arr, 2);

                        matchObj.Test = Object.keys(TournamentsObjLive).some(e => e === arr.matchId);
                        matchObj.Value = getValLive2.value;
                        matchObj.OddId = getValLive2.oddId;
                        matchObj.Oddtag = getValLive2.oddtag;
                        matchObj.Home = getValLive0.home;
                        matchObj.Away = getValLive0.away;
                        matchObj.BetTitle = getValLive1.betTitle;
                        matchObj.betMarketId = getValLive1.id;
                        matchObj.DeleteOdd = "DELETE_ODD";
                        // for PlaceBet request
                        matchObj.status = getValLive0.status;
                        matchObj.MatchId = getValLive0.matchid;
                        matchObj.BtrMatchId = getValLive0.btrmatchid;
                        matchObj.TournamentId = getValLive0.tournamentId;
                        matchObj.IsOutrightType = false;
                        matchObj.BetTitleType = getValLive1.betTitleType;
                        matchObj.Odds = [{
                                "value": getValLive2.value,
                                "id": "-" + getValLive2.oddId,
                                "tag": getValLive2.oddtag,
                            }]

                        if (!tournamentsCount.includes(getValLive1.id)) tournamentsCount.push(getValLive1.id);
                        allOddsArray.push(parseFloat(getValLive2.value));
                        matchObjArr.push(matchObj);
                    }
                }
            })

            if (JSON.stringify(TournamentsBets) !== JSON.stringify(state.prevOdds)) {
                for (let i = 0; i < allOddsArray.length; i++) lettersArr.push(String.fromCharCode(65 + i))
                props.dispatch({ type: 'LETTERS_ARRAY', payload: lettersArr })
            }

            props.dispatch({ type: 'MATCH_OBJ', payload: matchObjArr });
            props.dispatch({ type: 'TOURNAMENTS_COUNT', payload: tournamentsCount });
            props.dispatch({ type: 'ALL_ODDS_ARRAY', payload: allOddsArray });
            return {
                prevOdds: TournamentsBets,
                prevTournamentsObj: TournamentsObj,
                prevTournamentsObjLive: TournamentsObjLive
            }
        }
        return null
    }

    toggleDrawerClose = () => {
        this.props.toggleDrawer('bottom', false)
    };

    render() {
        const { betList } = this.props.state;
        return (
            <div className="page-grid__item betslip-area" id="betslipArea">
                <div className="betslip-area__container">
                    <div className="betslip-area__inner">
                        <div className="bs__header">
                            <div className="bs__title"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.BSArea.Betslip" defaultMessage="Betslip" /></div>
                            <div className="left-col">
                                <i className="bs-hide" onClick={this.toggleDrawerClose}></i>
                            </div>
                        </div>
                        {/* {console.log("======>", this.state.betDoneInfo)} */}
                        {
                            (betList.tipSize > 0)
                                ?
                                <Fragment>
                                    <BSTabs />
                                    <CheckboxControls />
                                    <Scrollbars
                                        renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                                        renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                                        renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                                        hideTracksWhenNotNeeded={true}
                                    >
                                        <BSForm
                                            setState={stateParams=>this.setState(stateParams)}
                                            isVirtual={this.state.isVirtual}
                                            TournamentsBets={TournamentsBets}
                                            TournamentsObj={TournamentsObj}
                                            TournamentsObjLive={TournamentsObjLive}
                                        /> 
                                        <div className="mt15">
                                            <CouponCheck />
                                        </div>
                                    </Scrollbars>
                                </Fragment>
                                :
                                this.state.betDone
                                    ?
                                    <BetSlipMessageBox 
                                        betDoneInfo={this.state.betDoneInfo} 
                                        setBetDoneState={getBetDoneState => this.setState(getBetDoneState)}
                                        requestMethod = {this.state.requestMethod}  
                                    />
                                    : <Fragment><BetSlipEmpty /> <CouponCheck /></Fragment>
                        }
                       
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: {
            betSlip: state.betSlip,
            bsTabs: state.bsTabs,
            odds: state.odds,
            betList: state.betList,
            tournamentsData: state.tournamentsData,
            virtualOdds: state.virtualOdds,
            virtualTournamentsData: state.virtualTournamentsData,
            liveMatches: state.liveMatches,
            sportId: state.virtualSportId,
        }
    }
};

export default withRouter(connect(mapStateToProps)(BSArea));