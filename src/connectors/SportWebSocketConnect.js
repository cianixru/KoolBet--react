import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import SockJS from 'sockjs-client';
import { SportWS } from 'config/constants';
// import CleanMatchData from 'view/Utils/CleanMatchData';

import { cleanMatchData } from 'state/actions/action'
// import LiveWebSocket from './LiveWebSocket'

let ws;
let liveMatches = {};
let liveSportList = [];
let firstSubscribe = true;

class SportWebSocketConnect extends PureComponent {

    state = {};

    componentWillUnmount() {
        ws.close();
        // this.props.dispatch(cleanMatchData())
    }

    componentDidMount() {
        if (!ws || ws.readyState != 1) {
            ws = new WebSocket(SportWS); //TODO: switch to SockJS when backend afford this
        }
        WSConnect(this.props);
    }

    static getDerivedStateFromProps(props, state) {

        if (ws && ws.readyState == 1) {

            if (state && props.state.tournamentId !== state.prevTournament && props.state.tournamentId !== '') {
                subscribeTournamentsRequest(props.state.subscribeMatch)
            }
            WSConnect(props);
            if (Object.keys(props.state.subscribeMatch).length > 0 && firstSubscribe) {
                firstSubscribe = false
                subscribeTournamentsRequest(props.state.subscribeMatch)
            }
        }
        return {
            ...state,
            prevTournament: props.state.tournamentId,
        };

    }

    render() {
        return true;
    }
}

const WSConnect = (props) => {
    if (ws) {
        try {
            ws.onopen = function (e) {
                console.log('%c Connection open! ', 'background: #090;');
            };
            ws.onmessage = function (event) {
                handleMessage(event, props);
            };
            ws.onerror = function (event) {
                console.log('Error! Code: ' + event.code + ' reason: ' + event.reason);
            };
            ws.onclose = function (event) {
                if (event.wasClean) {
                    console.log('%c Connection refused clean ', 'background: #900;');
                } else {
                    console.log('%c Connection refused not clean ', 'background: #900;');
                }
                setTimeout(WSConnect(props), 1000);
            };
        } catch (e) {
            console.log(e.name + e.message);
        }
    }

    return true;
}


const handleMessage = (event, props) => {

    let data = JSON.parse(event.data);

    // Get Sport list
    switch (data.channel) {
        case 'sport': {
            if (data.data.hasOwnProperty('sports')) {
                setSportList(data.data, props);
            }
            else if (data.data.hasOwnProperty('value') && data.data.value.length > 0) {
                let savedata = {
                    tournament: {
                        tournamentId: data.data.key.tournament,
                        value: data.data.value
                    }
                }
                changeSubscribeDataList(savedata, props);
                changeCurrentData(savedata, props);
                if (props.channel == data.channel) {
                }
            }
        }
            break;

        case 'live':
            setLiveData(data.data, props);
            if (props.channel == data.channel) {

            }
            break;

        default:
            break;
    }


}

const setSportList = (data, props) => {
    props.dispatch({ type: 'SET_SPORT_LIST', payload: data })
}

const changeSubscribeDataList = (data, props) => {
    props.dispatch({ type: 'ADD_TOURNAMENTS_DATA', payload: data })
}

const changeCurrentData = (data, props) => {
    props.dispatch({ type: 'ADD_SPORT_CURRENT_TOURNAMENT_DATA', payload: data })
}

const subscribeTournamentsRequest = (tournament) => {
    if (Object.keys(tournament).length > 0)
        ws.send(JSON.stringify(tournament))
}

const setLiveData = (data, props) => {

    if (data.hasOwnProperty('matches')) {
        data.matches.map(match => {
            if (match.Markets.length > 0)
                liveMatches[match.matchid] = match;
            else {
                props.dispatch({ type: 'DELETE_MATCH_ODDS', payload: match.matchid })
                delete liveMatches[match.matchid]
            }
            let odd = props.state.odds.find(e => e.matchId == match.matchid)
            if (odd) {
                if (!match.Markets.some(e => e.id == odd.betDomainId)) {
                    console.log(match);
                    props.dispatch({ type: 'DELETE_MATCH_ODDS', payload: match.matchid })
                }
            }
            liveSportList = liveSportList.filter(e => e.sportname !== match.sportname);
            liveSportList = [...liveSportList, { sportname: match.sportname }]
            liveSportList.sort((a, b) => {
                if (a.sportname > b.sportname && a.sportname != 'Soccer') {
                    return 1;
                }
                if (b.sportname == 'Soccer') {
                    return 1;
                }
            })

        })
    }
    // console.log(liveMatches);
    // if (JSON.stringify(liveMatches) != JSON.stringify(props.state.liveMatches)) {
    props.dispatch({ type: 'ADD_LIVE_TOURNAMENTS_DATA', payload: liveMatches })
    // }


    if (JSON.stringify(liveSportList) != JSON.stringify(props.state.liveMenu)) {
        // console.log(liveSportList);
        // console.log(props.state.liveMenu);
        props.dispatch({ type: 'SET_LIVE_MENU', payload: liveSportList })
    }

}



function mapStateToProps(state) {
    return {
        state: {
            sportList: state.sportList,
            sportId: state.sportId,
            tournamentList: state.tournamentList,
            tournamentId: state.tournamentId,
            // matchId: state.matchId,
            // marketId: state.marketId,
            odds: state.odds,
            currentTournamentData: state.currentTournamentData,
            tournamentsData: state.tournamentsData,
            liveMatches: state.liveMatches,
            liveMenu: state.liveMenu,
            subscribeMatch: state.subscribeMatch,
        }
    }
}

export default connect(mapStateToProps)(SportWebSocketConnect);