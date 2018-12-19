import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { getByCodeAPI } from "config/constants";
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';
import MaskedInput from 'react-maskedinput'
import MyBetsModal from './MyBetsModal'

class CouponCheck extends PureComponent {

    state = {
        card: '',
        couponCode: '',
        typeCode: '',
        bokingResponse: '',
        closeModal: false,
        prevActiveCategory: 'Today'
    };

    componentDidMount() {
        this.urlParse()
    }


    urlParse = () => {
        let params = new URLSearchParams(this.props.location.search);
        let couponCode = params.get("coupon_code");
        if (couponCode) {
            this.makeRequest(couponCode);
        }
    }

    onChange = (e, type) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    async makeRequest(code) {
        this.props.history.push(this.props.history.location.pathname + "?coupon_code=" + code)

        let data = await (await (fetch(getByCodeAPI + code, {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        )
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({ 'bokingResponse': res.response });
                this.setState({ 'closeModal': false });
                return res
            })
            .catch(err => {
                console.log('Error: ', err)
            })
        ))
        return data
    }

    toState = (bokingResponse, TournamentsObj, addOdds) => {
        const getVal = (array, obj, type) => {
            if (type === 0) {
                let result = array.find(e => parseInt(e.tournament.tournamentId, 10) == parseInt(obj.tournamentId, 10));
                let result1 = result.tournament.value.find(e => e.matchId == obj.matchId)
                return result1;
            }
            if (type === 1) {
                let result = array[obj.matchId];
                let result1 = result.Markets.find(e => parseInt(e.id, 10) == parseInt(obj.betDomainId, 10));
                return result1;
            }
        }
        let toStateOut = bokingResponse.map((e, i) => {
            let findVal;
            let getVal1;
            if (addOdds[i].type === 0) {
                getVal1 = getVal(this.props.state.tournamentsData, addOdds[i], 0);
                findVal = getVal1.groups.map((e) => {
                    if (e.Markets.find(e => e.id == addOdds[i].betDomainId))
                        return e.id
                }).find(e => e)
            }
            if (addOdds[i].type === 1) {
                getVal1 = getVal(this.props.state.liveMatches, addOdds[i], 1);
            }

            return (
                {
                    betDomainId: (e.tipDetailsWS.sourceType === 1)
                        ? e.tipDetailsWS.betdomainORMID.toString().slice(1)
                        : parseInt(e.tipDetailsWS.betdomainORMID, 10),
                    groupId: (e.tipDetailsWS.sourceType === 0) ? findVal : '',
                    matchId: (e.tipDetailsWS.sourceType === 1)
                        ? (e.tipDetailsWS.matchORMID).toString().slice(1)
                        : (e.tipDetailsWS.matchORMID).toString(),
                    oddId: (e.tipDetailsWS.sourceType === 1)
                        ? e.svrOddID.toString().slice(1)
                        : e.svrOddID,
                    tournamentId: (e.tipDetailsWS.sourceType === 0)
                        ? (e.tipDetailsWS.ligaId).toString()
                        : (e.tipDetailsWS.sourceType === 1)
                            ? ""
                            : ""
                    ,

                    type: (e.tipDetailsWS.sourceType === 0)
                        ? 'prematch'
                        : (e.tipDetailsWS.sourceType === 1)
                            ? 'live'
                            : (e.tipDetailsWS.sourceType === 10)
                                ? "virtual"
                                : "",
                }
            )
        })

        for (let index = 0; index < toStateOut.length; index++) {
            const element = toStateOut[index];
            this.props.dispatch({ type: 'ADD_ODD', payload: element })
        }
        this.props.dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: this.state.prevActiveCategory })
        this.setState({ 'closeModal': true });
    }


    rebet = () => {
        this.setState({ prevActiveCategory: this.props.state.activeCategory });
        this.props.dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: "More" });
        setTimeout(() => {
            this.sendBookingBet(this.state.bokingResponse)
        }, 200);
    }

    sendBookingBet = (bokingResponse) => {
        let TournamentsObj = this.props.state.tournamentsData;
        let sports = this.props.state.sportList.sports;

        let countryId = (tournamentId) => {
            let out = sports.map((e) => {
                let item = e.countries.map(
                    (e) => {
                        if (e.tournaments.find(e => e.id === tournamentId))
                            return e
                    }
                ).find(e => e)
                if (item)
                    return item.id;
            })
            return out.find((e) => e)
        }

        let sportId = (tournamentId) => sports.find((e) => {
            let item = e.countries.map(
                (e, i) => {
                    if (e.tournaments.find(e => e.id === tournamentId))
                        return e
                }
            ).find(e => e)
            if (item)
                return item
        })

        Promise.resolve(bokingResponse).then(response => {
            let arr = [];
            response.bets.betWS[0].bankTips.tipWS.map((e) => {
                console.log('e.tipDetailsWS.sourceType :', e.tipDetailsWS.sourceType);
                if(e.tipDetailsWS.sourceType === 0) {
                    return arr.push({
                        betDomainId: Math.abs(e.tipDetailsWS.betdomainORMID),
                        matchId: (Math.abs(e.tipDetailsWS.matchORMID)).toString(),
                        tournamentId: (Math.abs(e.tipDetailsWS.ligaId)).toString(),
                        type: e.tipDetailsWS.sourceType
                    })    
                }
                else if(e.tipDetailsWS.sourceType === 1) {
                    return arr.push({
                        betDomainId: e.tipDetailsWS.betdomainORMID.toString().slice(1),
                        matchId: e.tipDetailsWS.matchORMID.toString().slice(1),
                        tournamentId: e.tipDetailsWS.ligaId.toString().slice(1),
                        type: e.tipDetailsWS.sourceType
                    })
                }
                else return null
            })
            return arr
        })
            .then(arr => {
                arr.map((e, i) => {
                    let subscribe;
                    if (arr[i].type === 0) {
                        subscribe = {
                            channel: "sport",
                            key: "tournament",
                            date: "More",
                            country: countryId(arr[i].tournamentId),
                            sport: sportId(arr[i].tournamentId).id,
                            tournament: arr[i].tournamentId
                        }
                        this.props.dispatch({ type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe });
                        this.props.dispatch({ type: 'ADD_TOURNAMENT_ID', payload: arr[i].tournamentId });
                    }
                })
                return arr;
            })
            .then(addOdds => {
                setTimeout(() => {
                    this.toState(bokingResponse.bets.betWS[0].bankTips.tipWS, TournamentsObj, addOdds);
                    this.props.history.push(this.props.history.location.pathname)
                }, 250);
            })
    }

    render() {
        return (
            <Fragment>
                <div className="betslip--panel">
                    <div className="bs__title"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.CouponCheck.title" /></div>
                    <div className="slipMessgeContent"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.CouponCheck.Message" /></div>

                    <div className="bs-btn-block slipMessgeFooter">
                        <div className="input-group">
                            <MaskedInput
                                mask="***-*******"
                                type="text"
                                className="additional-bs__input"
                                placeholder="___–_______"
                                name="typeCode"
                                onChange={e => this.onChange(e, 'typeCode')}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        this.makeRequest(this.state.typeCode)
                                    }
                                }}
                            />
                            <div className="input-group-button">
                                <input
                                    type="submit"
                                    onClick={() => this.makeRequest(this.state.typeCode)}
                                    className="enter__input" value="Check"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {(this.state.bokingResponse && this.props.history.location.search !== "" &&
                    <MyBetsModal
                        bokingResponse={this.state.bokingResponse}
                        location={this.props.location.pathname}
                        setState={stateParams => this.setState(stateParams)}
                        rebet={() => this.rebet()}
                    />
                )}
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    return {
        state: {
            odds: state.odds,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,
            liveMatches: state.liveMatches,
            sportList: state.sportList,
            activeCategory: state.activeCategory,

        }
    }
}

export default withRouter(connect(mapStateToProps)(CouponCheck));