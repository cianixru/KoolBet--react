import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { loadStored } from "config/constants";
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';

class BetSlipEmpty extends PureComponent {

    state = {
        bookingCode: '',
        bokingResponse: '',
    };

    componentDidMount() {
        this.urlParse()
    }
    
    urlParse = () => {
        let params = new URLSearchParams(this.props.location.search);
        let bookCodeUrl = params.get("booking_code");
        if(bookCodeUrl) 
            this.makeRequest(bookCodeUrl);
    }

    onChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    };

    async makeRequest(code) {
        let data = await (await (fetch(loadStored + code, {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        )
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({ 'bokingResponse': res.response },
                    () => this.sendBookingBet(res.response));
                return res
            })
            .catch(err => {
                console.log('Error: ', err)
            })
        ))
        return data
    }

    toState = (bokingResponse, TournamentsObj, addOdds) => {
        const getVal = (array, obj, level) => {
            let result = array.find(e => parseInt(e.tournament.tournamentId, 10) == parseInt(obj.tournamentId, 10));
            let result1 = result.tournament.value.find(e => e.matchId == obj.matchId)   
            return result1;     
        }


        let toStateOut = bokingResponse.values.map((e, i) => {   
            let getVal1 = getVal(this.props.state.tournamentsData, addOdds[i], 1);
            let findGroupId = getVal1.groups.map((e) => {
                if (e.Markets.find(e => e.id === addOdds[i].betDomainId))
                    return e.id
            }).find(e => e)

            return ({
                betDomainId: e.betMarketId,
                groupId: findGroupId,
                matchId: (e.matchId).toString(),
                oddId: e.odds[0].id,
                tournamentId: (e.tournamentId).toString(),
                type: (bokingResponse.pageType === 0)
                    ? 'prematch'
                    : (bokingResponse.pageType === 1)
                        ? 'live'
                        : (bokingResponse.pageType === 10)
                            ? "virtual"
                            : "2",
            })
        })
        for (let index = 0; index < toStateOut.length; index++) {
            const element = toStateOut[index];
            this.props.dispatch({ type: 'ADD_ODD', payload: element })
        } 
    }

    sendBookingBet = (bokingResponse) => {
        let TournamentsObj = this.props.state.tournamentsData;
        let sports = this.props.state.sportList.sports;
        console.log('this.props.state.sportList.sports :', this.props.state.sportList.sports);
        
        let countryId = (tournamentId) => {
            let out = sports.map((e)=> {
                let item = e.countries.map(
                    (e)=> {
                        if (e.tournaments.find(e=> e.id === tournamentId))
                            return e
                    }
                ).find(e => e)
                if(item)
                    return item.id;
            })
            return out.find((e)=>e)
        }
        
        let sportId = (tournamentId) => sports.find((e)=> {
            let item = e.countries.map(
                (e,i)=> {
                    if (e.tournaments.find(e=> e.id === tournamentId))
                    return e
                }
                ).find(e => e)
                if(item)
                return item
        })

        var dispSubscribe = Promise.resolve(bokingResponse).then(response => {
            let arr = [];
            
            response.values.map((e) => {
                return arr.push({
                    betDomainId: e.betMarketId,
                    matchId: (e.matchId).toString(),
                    tournamentId: (e.tournamentId).toString(),
                })               
            })
            return arr
        })
        .then(addOdds => {
                bokingResponse.values.map((e, i) => {                
                let subscribe = {
                    channel: "sport",
                    key: "tournament",
                    date: "More",
                    country: countryId(addOdds[i].tournamentId),
                    sport: sportId(addOdds[i].tournamentId).id,
                    tournament: addOdds[i].tournamentId
                }
                this.props.dispatch({ type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe });
                this.props.dispatch({ type: 'ADD_TOURNAMENT_ID', payload: addOdds[i].tournamentId });
                
            })            
            return addOdds;
        })
        .then(addOdds => {
            setTimeout(() => {
                this.toState(bokingResponse, TournamentsObj, addOdds);
                this.props.history.push('/sport')
            }, 250);
        })
    }

    render() {

        return (
            <div className="betslip--panel">
                <div className="bs__title"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.BetSlipEmpty.Betslip" /></div>
                <div className="slipMessgeContent"><FormattedMessage id="MainContainer.MatchContents.RightSidebar.BetSlipEmpty.Message" /></div>

                    <div className="bs-btn-block slipMessgeFooter type2">
                        <div className="input-group">
                            <input 
                                type="text"
                                className="additional-bs__input"
                                placeholder="Insert Booking Number"
                                onChange={e => this.onChange(e, 'bookingCode')}
                                onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.makeRequest(this.state.bookingCode)
                                        }
                                    }}
                            />
                            <div className="input-group-button">
                                <input 
                                    type="submit" 
                                    onClick={() => this.makeRequest(this.state.bookingCode)} 
                                    className="enter__input" value="Load" 
                                />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        state: {
            odds: state.odds,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,

            sportList: state.sportList,

        }
    }
}

export default withRouter(connect(mapStateToProps)(BetSlipEmpty));