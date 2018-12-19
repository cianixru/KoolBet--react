import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import FootballMatchList from './FootballMatchList';
import LeagueFootball from './LeagueFootball';
import RaceMatchList from './RaceMatchList';

let matchData;

class TournamentDetails extends Component {

    handleOddClick = (oddId, betDomainId, matchId, tournamentId) => {
        // console.log(tournamentId);
        if (this.props.state.odds && this.props.state.odds.find(el => el.oddId === oddId)) {
            this.props.dispatch({ type: 'DELETE_VIRTUAL_ODD', payload: oddId })
        } else {
            let toState = {
                type: 'virtual',
                tournamentId: tournamentId,
                matchId: matchId,
                groupId: "",
                betDomainId: betDomainId,
                oddId: oddId,
            };
            this.props.dispatch({ type: 'ADD_VIRTUAL_ODD', payload: toState })
        }
    };

    render() {
        if (Object.keys(this.props.state.currentTournamentData).length !== 0 && this.props.state.currentTournamentData.tournament) {
            matchData = this.props.state.currentTournamentData.tournament.matchs[0];
        }
        return (
            <Fragment>
                <section className="bettig-panel">
                    { (Object.keys(this.props.state.currentTournamentData).length > 0) && this.getComponent(this.props.state.sportId.toLowerCase(), matchData) }
                </section>
            </Fragment>
        );
    }

    getComponent = (sportType, matchData) =>{
        for (let n = 0 ; n < this.componentMap.length; n++){
            if(this.componentMap[n].name === (sportType)){
                return this.componentMap[n].component(matchData);
            }
        }
    };

    componentMap = [
        {
            name: 'soccer',
            component: (matchData) => { return <FootballMatchList matchData={matchData} handleOddClick={(oddId, betDomainId, matchId, tournamentId) => this.handleOddClick(oddId, betDomainId, matchId, tournamentId)}/> }
        },
        {
            name: 'englishfastleaguefootball',
            component: (matchData) => { return this.getFootballLeagueComponent(matchData) }
        },
        {
            name: 'dashingderby',
            component: (matchData) => { return this.getRaceComponent(matchData) }
        },
        {
            name: 'platinumhounds',
            component: (matchData) => { return this.getRaceComponent(matchData) }
        }];

    getFootballLeagueComponent = (matchData) =>{
        let delay = matchData.startDate - (Date.now() + 5000);
        if(delay > 0){
            setTimeout(() => { this.forceUpdate() }, delay);
        }

        let closed = matchData.startDate < (Date.now() + 5000);
        return <LeagueFootball matchData={this.props.state.currentTournamentData.tournament}
                               handleOddClick={(oddId, betDomainId, matchId, tournamentId) => this.handleOddClick(oddId, betDomainId, matchId, tournamentId)}
                               closed={closed}/>
    };

    getRaceComponent = (matchData) => {
        return <RaceMatchList matchData={matchData} handleOddClick={(oddId, betDomainId, matchId, tournamentId) => this.handleOddClick(oddId, betDomainId, matchId, tournamentId)}/>
    };
}


function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            nowDiff: state.nowDiff,
            sportId: state.virtualSportId,
            tournamentId: state.virtualTournamentId,
            currentTournamentData: state.virtualCurrentTournamentData,
            odds: state.virtualOdds,
        }
    }
}

export default connect(mapStateToProps)(TournamentDetails);