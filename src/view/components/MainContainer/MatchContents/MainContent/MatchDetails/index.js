import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import CategoriesFilter from './CategoriesFilter';
import MatchData from './MatchData';

let index = 0;
let matchData;

class MatchDetails extends Component {
    state = { marketGroups: {}, selectedMarkets: {} }

    static getDerivedStateFromProps(props, state) {
        let matchParams = props.matchId.split('-');
        let tournamentId = matchParams[2];
        let matchId = matchParams[3];
        if (props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId == tournamentId)) {
            matchData = props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId == tournamentId).tournament.value.find(e => e.matchId == matchId)
        }

    }

    componentDidMount() {
        let matchParams = this.props.matchId.split('-');
        let sportId = matchParams[0];
        let countryId = matchParams[1];
        let tournamentId = matchParams[2];
        let matchId = matchParams[3];

        if (this.props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId == tournamentId)) {
            matchData = this.props.state.currentTournamentData.find(tournaments => tournaments.tournament.tournamentId == tournamentId).tournament.value.find(e => e.matchId == matchId)
        }
        else if (this.props.state.liveMatches[matchId]) {
            matchData = this.props.state.liveMatches[matchId]
        }
        else {
            // this.props.dispatch({ type: 'CLEAR_CURRENT_TOURNAMENT_DATA' })
            let subscribe = {
                "channel": "sport",
                "key": "tournament",
                "date": "Today",
                "sport": sportId,
                "country": countryId,
                "tournament": tournamentId
            }
            this.props.dispatch({ type: 'ADD_TOURNAMENT_SUBSCRIBE', payload: subscribe });
            this.props.dispatch({ type: 'ADD_TOURNAMENT_ID', payload: tournamentId })
            matchData = this.props.state.currentTournamentData.find(e => e.tournament.tournamentId == tournamentId)
        }
    }

    selectMarkets = (markets, index) => {
        if (this.state.selectedMarkets[index] != markets)
            this.setState(prevState => {
                prevState.selectedMarkets[index] = markets;
                return { ...prevState, selectedMarkets: { ...prevState.selectedMarkets } }
            })
    }

    // static getDerivedStateFromProps(props, state) {
    //     return null
    // }

    render() {

        let mGroup = {};

        if (matchData && this.props.type == '/sport') {
            let sortGroup = {};
            matchData.groups.map(group => {
                if (sortGroup[group.sort] != group.id) {
                    sortGroup[group.sort] = group.id
                }
            });
            mGroup[index] = Object.values(sortGroup)
        }

        if (JSON.stringify(this.state.marketGroups) != JSON.stringify(mGroup)) {
            this.setState(state => {
                return {
                    ...state,
                    marketGroups: { ...mGroup },
                }
            });
        }

        return (
            <Fragment>
                {(matchData)
                    ?
                    <Fragment>
                        {(this.props.type == '/sport')
                            ?
                            <CategoriesFilter
                                index={index}
                                selectededMarkets={this.selectMarkets}
                                categories={this.state.marketGroups[index]}
                                sport={matchData.sportdescriptor}
                                title={matchData.home + ' - ' + matchData.away}
                            />
                            : null
                        }
                        {
                            (this.props.type == '/sport' && this.state.selectedMarkets[index])
                                ? this.state.selectedMarkets[index].map((e, i) => {
                                    return (
                                        (this.state.marketGroups[index] && this.state.marketGroups[index].length > 0 && this.state.marketGroups[index].includes(e))
                                            ? <MatchData matchData={matchData} marketGroup={e} key={i} type={this.props.type} />
                                            : null

                                    )
                                })
                                : (this.props.type == '/live')
                                    ? <MatchData matchData={matchData} marketGroup='' type={this.props.type} />
                                    : null
                        }
                    </Fragment>

                    : null
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

export default connect(mapStateToProps)(MatchDetails)
