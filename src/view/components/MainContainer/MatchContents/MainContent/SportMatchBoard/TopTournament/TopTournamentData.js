import React, {Fragment} from 'react';
import {connect} from "react-redux";
import Asian from "../Templates/Asian";
import Bmg1hCs from "../Templates/Bmg1hCs";
import BmgCorrectScore from "../Templates/BmgCorrectScore";
import BmgOutright from "../Templates/BmgOutright";
import MatchData from "./MatchDataTopTournament";
import CategoriesFilterTop from "../CategoriesFilterTop";


class TopTournamentData extends React.PureComponent {

    state = {marketGroups: {}, selectedMarkets: {}, common: false}
    tournaments = []

    componentDidMount() {
        let sports = this.props.tournament.sports;
        sports.map((element) => {
            let countriesNames = Object.keys(element["countries"]);
            countriesNames.forEach((item) => {
                Object.keys(element["countries"][item]).forEach((tournament) => {
                    this.tournaments.push(tournament);
                    let subscribe = {
                        "channel": "sport",
                        "key": "tournament",
                        "date": "More",
                        "sport": element.id.toString(),
                        "country": item.toString(),
                        "tournament": tournament.toString()
                    }
                    // console.log('subscribe ========> :', subscribe);
                    this.props.dispatch({type: 'ADD_TOURNAMENT_ID', payload: tournament.toString()});
                    this.props.dispatch({type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe});
                })
            })
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    static getDerivedStateFromProps(props, state) {
        let mGroup = {};
        if (Array.isArray(props.state.currentTournamentData)) {
            props.state.currentTournamentData.map((e, index) => {
                let sortGroup = {};
                e.tournament.value.map(tournament => {
                    tournament.groups.map(group => {
                        sortGroup[group.sort] = {id: group.id, txt: group.txt, txts: group.txts}
                    });
                })
                mGroup[index] = Object.values(sortGroup)
            })
        }

        if (JSON.stringify(state.marketGroups) !== JSON.stringify(mGroup)) {
            return {marketGroups: {...mGroup}}
        }

        return null;
    }

    selectMarkets = (markets, index) => {
        if (this.state.selectedMarkets[index] !== markets && !this.state.common) {
            this.setState(prevState => {
                prevState.selectedMarkets[index] = markets;
                return {...prevState, selectedMarkets: {...prevState.selectedMarkets}}
            })
        }
    }

    handleClose = (index) => {
        let tournament = this.props.state.currentTournamentData[index].tournament.tournamentId;
        this.props.state.currentTournamentData.forEach((e)=>{
            let toDelete = {tournament: {tournamentId: e.tournament.tournamentId}}
            this.props.dispatch({type: 'TOURNAMENT_COUNTER_SUB'});
            this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete})
            this.props.dispatch({type: 'CLEAR_TOURNAMENT_ID', payload: e.tournament.tournamentId})
            this.props.dispatch({type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: e.tournament.tournamentId})
        })

    }

    viewTemplate = (group, index) => {
        const {currentTournamentData} = this.props.state;
        let inds = this.findInds();
        switch (group) {
            case 'BMG_ASIAN':
                return <Asian/>
            case 'BMG_1H_CS':
                return <Bmg1hCs market={currentTournamentData[index]}
                                marketGroup={this.state.marketGroups[index].find(el => el.id === group)}/>
            case 'BMG_CORRECTSCORE':
                return <BmgCorrectScore market={currentTournamentData[index]}
                                        marketGroup={this.state.marketGroups[index].find(el => el.id === group)}/>
            case 'BMG_OUTRIGHT':
                return <BmgOutright market={currentTournamentData[index]}
                                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)}/>
            default:
                return <MatchData market={currentTournamentData[index]}
                                  marketGroup={this.state.marketGroups[index].find(el => el.id === group)}
                                  inds = {inds}
                />
        }
    }

     componentWillUnmount() {
      //   console.warn("Unmount");
         let tournaments = this.tournaments;
         tournaments.forEach((element) => {
             let toDelete = {tournament: {tournamentId: element}}
             this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete})
             this.props.dispatch({type: 'CLEAR_TOURNAMENT_ID', payload: element})
             this.props.dispatch({type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: element})
         })
     }

    toggleCommon = () => {
        this.setState(prevState => ({
            common: !prevState.common
        }));
    }

    findIndex = () => {
        let index = -1;
        for (let i = 0; i < this.tournaments.length; i++) {
            index = this.props.state.currentTournamentData.findIndex((element, index) => {
                return element["tournament"]["tournamentId"] == this.tournaments[i];
            })
            if (index != -1) {
                break;
            }
        }
        return index;
    }

    findInds =()=>{
        let ind = [];
        this.tournaments.forEach((el,index)=>{
            let tournamentIndex = -1;
            tournamentIndex= this.props.state.currentTournamentData.findIndex((e,i)=>{return e.tournament.tournamentId==el})
            if(tournamentIndex!=-1)
                ind.push(tournamentIndex);

        })
        return ind;
    }

    updateSelectedMarkets = (val) => {
        let marketsList = [];
        let selectedMarkets = this.state.selectedMarkets;
        for (let markets in selectedMarkets) {
            marketsList[markets] = val
        }
        this.setState(
            {selectedMarkets: marketsList}
        )
    }

    render() {
        let tournaments = this.tournaments;
        let example = this.findIndex();
        const {currentTournamentData} = this.props.state;
        let group = '';
        if (Array.isArray(currentTournamentData) && example != -1) {
            if (currentTournamentData[example].tournament.value[0].isOutrightType) {
                group = 'BMG_OUTRIGHT';
            } else {
                group = 'BMG_MAIN';
            }
        }

        return (
            <Fragment>
                {
                    ((Array.isArray(currentTournamentData)) && (example != -1) ?
                        this.tournaments.slice(0,1).map((e, index) => {
                            if (tournaments.indexOf(currentTournamentData[example]["tournament"]["tournamentId"]) != -1) {
                                return (

                                    <Fragment key={currentTournamentData[example]["tournament"]["tournamentId"]}>
                                        <CategoriesFilterTop
                                            index={index}
                                            handleClose={this.handleClose}
                                            sport={currentTournamentData[index].tournament.value[0].sportdescriptor}
                                            title={this.props.tournament.name}
                                        />

                                        {
                                            this.viewTemplate(group, example)
                                        }

                                    </Fragment>
                                )
                            } else {
                                return null;
                            }

                        })
                        : null)
                }
            </Fragment>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            currentTournamentData: state.currentTournamentData,
            topTournaments: state.sportList.top_tournaments,
        }
    }
}


export default connect(mapStateToProps)(TopTournamentData)