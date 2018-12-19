import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import CategoriesFilter from './CategoriesFilter';
import MatchDetailsHeader from './MatchDetailsHeader';

import MatchData from './Templates/MatchData';
import Asian from './../SportMatchBoard/Templates/Asian';
import BmgCorrectScore from './Templates/BmgCorrectScore';
import Bmg1hCs from './Templates/Bmg1hCs';
import BmgOutright from './Templates/BmgOutright';


let index = 0;
let matchData;

class MatchDetails extends Component {
    state = { marketGroups: {}, selectedMarkets: {} }

    static getDerivedStateFromProps(props, state) {
        let matchParams = props.matchId.split('-');
        let tournamentId = matchParams[2];
        let matchId = matchParams[3];
        if (props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId === tournamentId)) {
            matchData = props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId === tournamentId).tournament.value.find(e => e.matchId === matchId)
        }

        if (props.type === '/live' && props.state.liveMatches[matchId] && (JSON.stringify(props.state.liveMatches[matchId]) !== JSON.stringify(state.pevLiveMatches))) {
            matchData = props.state.liveMatches[matchId]
            return { pevLiveMatches: props.state.liveMatches[matchId] }
        }
        return null

    }

    componentDidMount() {
        let matchParams = this.props.matchId.split('-');
        let sportId = matchParams[0];
        let countryId = matchParams[1];
        let tournamentId = matchParams[2];
        let matchId = matchParams[3];
        if (this.props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId === tournamentId)) {
            matchData = this.props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId === tournamentId).tournament.value.find(e => e.matchId === matchId)
        }
        else if (this.props.state.liveMatches[matchId]) {
            matchData = this.props.state.liveMatches[matchId]
        }
        else {
            // this.props.dispatch({ type: 'CLEAR_CURRENT_TOURNAMENT_DATA' })
            let subscribe = {
                "channel": "sport",
                "key": "tournament",
                "date": "More",
                "sport": sportId,
                "country": countryId,
                "tournament": tournamentId
            }
            this.props.dispatch({ type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe });
            this.props.dispatch({ type: 'ADD_TOURNAMENT_ID', payload: tournamentId })
            matchData = this.props.state.currentTournamentData.find(e => e.tournament.tournamentId === tournamentId)
        }

    }

    componentWillUnmount() {
        matchData = null;
        /*  let toDelete = {tournament: {tournamentId: element}}
          this.props.dispatch({type: 'DELETE_SPORT_CURRENT_TOURNAMENT_DATA', payload: toDelete})
          this.props.dispatch({type: 'CLEAR_TOURNAMENT_ID', payload: element})
          this.props.dispatch({type: 'DELETE_TOURNAMENT_SUBSCRIBE', payload: element})*/
    }

    selectMarkets = (markets, index) => {
        if (this.state.selectedMarkets[index] !== markets)
            this.setState(prevState => {
                prevState.selectedMarkets[index] = markets;
                return { ...prevState, selectedMarkets: { ...prevState.selectedMarkets } }
            })
    };

    viewTemplate = (group, index, i) => {
        const { currentTournamentData } = this.props.state;
        //console.log('group :', group);
        switch (group) {
            case 'BMG_ASIAN':
                return <Asian />

            case 'BMG_CORRECTSCORE':
                return <BmgCorrectScore
                    market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)}
                    key={i}
                    type={this.props.type}
                />

            case 'BMG_1H_CS':
                return <Bmg1hCs 
                    market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)} 
                    key={i}
                    type={this.props.type}
                />

            case 'BMG_OUTRIGHT':
                return <BmgOutright market={currentTournamentData[index]}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)} 
                    key={i}
                    type={this.props.type} />

            default:
                return <MatchData
                    matchData={matchData}
                    marketGroup={this.state.marketGroups[index].find(el => el.id === group)}
                    key={i}
                    type={this.props.type}
                />
            // return <MatchData market={currentTournamentData[index]}
            //     marketGroup={this.state.marketGroups[index].find(el => el.id === group)} />
        }
    }

    render() {

        let mGroup = {};
        if (matchData && this.props.type === '/sport') {
            let sortGroup = {};
            matchData.groups.map(group => {
                sortGroup[group.sort] = { id: group.id, txt: group.txt, txts: group.txts }
            });
            mGroup[index] = Object.values(sortGroup)
        }

        if (JSON.stringify(this.state.marketGroups) !== JSON.stringify(mGroup)) {
            this.setState(state => {
                return {
                    ...state,
                    marketGroups: { ...mGroup },
                }
            });
        }
        { //console.log('index={index} :', matchData)
        }
        return (
            <Fragment>
                {(matchData) ?
                    <Fragment>
                        <MatchDetailsHeader
                            type={this.props.type.replace('/', '')}
                            sport={matchData.sportdescriptor}
                            home={matchData.home}
                            away={matchData.away}
                            awayRedCards={matchData.awaycardsteam}
                            homeRedCards={matchData.homecardsteam}
                            periodInfo={matchData.periodinfo}
                            totalScore={matchData.totalscore}
                            startDate={matchData.startdate}
                            matchData ={matchData}
                        />

                        {(this.props.type === '/sport') &&
                            <CategoriesFilter
                                index={index}
                                selectededMarkets={this.selectMarkets}
                                categories={this.state.marketGroups[index]}
                                sport={matchData.sportdescriptor}
                                title={matchData.home + ' - ' + matchData.away}
                            />
                        }
                        {
                            (this.props.type === '/sport' && this.state.selectedMarkets[index])
                                ? this.state.selectedMarkets[index].map((e, i) => {
                                    return (
                                        (this.state.marketGroups[index] && this.state.marketGroups[index].length > 0 && this.state.marketGroups[index].some(el => el.id === e))
                                        &&
                                        this.viewTemplate(e, index, i)

                                    )
                                })
                                : (this.props.type === '/live') && <MatchData matchData={matchData} marketGroup='' type={this.props.type} />

                        }
                    </Fragment>
                    : <p></p>
                }

            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            tournamentId: state.tournamentId,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,
            liveMatches: state.liveMatches,
        }
    }
}

export default connect(mapStateToProps)(withRouter(MatchDetails))
