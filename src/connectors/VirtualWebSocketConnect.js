import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import { cleanMatchData } from 'state/actions/action'

import SockJS from 'sockjs-client';
import { KironWS } from 'config/constants';

let ws;
let refreshIntervalId;

class VirtualWebSocketConnect extends PureComponent {

    state = { initialSubscribed: true }

    componentWillUnmount() {
        ws.close();
        // this.props.dispatch(cleanMatchData()); //TODO: clean data on change page
    }

    componentDidMount() {
        if (!ws || ws.readyState != 1) {
            ws = new SockJS(KironWS + '?lang=en');
        }
        // this.props.dispatch({ type: 'CLEAR_SPORT_LIST' });
        // this.props.dispatch({ type: 'CLEAR_TOURNAMENT_LIST' });
        // this.props.dispatch({ type: 'CLEAR_TOURNAMENTS_DATA' });
        WSConnect(this.props)

    }

    static getDerivedStateFromProps(props, state) {
        if (ws && ws.readyState == 1) {
            clearInterval(refreshIntervalId);
            refreshIntervalId = setInterval(() => checkTimeLine(props), 1000);
            WSConnect(props);
            
            if (state.initialSubscribed) {
                if (props.state.tournamentId)
                    subscribeTournamentsRequest([parseInt(props.state.tournamentId)])
                subscribeOdds(props);
                state.initialSubscribed = false
            }

            if (Object.keys(props.state.sportList).length > 0 && JSON.stringify(props.state.sportList) !== JSON.stringify(state.prevSportList)) {
                (props.state.sportId && props.state.sportId != '')
                    ? sportListRequest(props.state.sportId)
                    : props.dispatch({ type: 'ADD_VIRTUAL_SPORT_ID', payload: 'Football' })
            }

            if (Object.keys(props.state.tournamentList).length > 0 && JSON.stringify(props.state.tournamentList) !== JSON.stringify(state.prevTournamentList)) {
                showTournament(0, props);
            }
            if (props.state.tournamentId.length > 0 && props.state.tournamentId !== state.prevTournamentId) {
                console.log(1);
                subscribeTournamentsRequest([parseInt(props.state.tournamentId)])
            }
            if (Array.isArray(props.state.tournamentsData) && props.state.tournamentsData.length > 0 && props.state.tournamentsData !== state.prevTournamentsData) {
                changeCurrentData(props.state.tournamentsData.find(e => e.tournament.tournamentId == props.state.tournamentId), props);
            }

            if (props.state.sportId !== '' && props.state.sportId !== state.prevSportId) {
                clearTournamentList(props)
                sportListRequest(props.state.sportId)
            }
        }

        return {
            ...state,
            prevSportList: props.state.sportList,
            prevTournamentList: props.state.tournamentList,
            prevTournamentId: props.state.tournamentId,
            prevTournamentsData: props.state.tournamentsData,
            prevSportId: props.state.sportId,
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
    if ('sportNames' in data) {
        setSportList(data.sportNames, props);
    }
    // Get Sport Tournaments
    else if ('tournamentIds' in data && Object.keys(data.tournamentIds).length > 0) {
        setTournamentList(data.tournamentIds, props)
    }
    // Get Tournaments Matches
    else if ('tournaments' in data) {
        matchListRequest(data, props);
    }
    // Get Subscribed Tournament data
    else if ('tournament' in data) {
        changeSubscribeDataList(data, props)
    }

}

const subscribeOdds = (props) => {
    let subOdds = [];
    props.state.odds.map((e) => {
        if (!subOdds.includes(parseInt(e.tournamentId)))
            subOdds.push(parseInt(e.tournamentId))
    })
    subOdds.map(odd => {
        if (props.state.tournamentsData.find(e => e.tournament.tournamentId == odd).tournament.expireDate < Date.now())
            subOdds = subOdds.filter(e => e != odd)
    })
    if (subOdds.length > 0)
        subscribeTournamentsRequest(subOdds)
}

const setSportList = (data, props) => {
    props.dispatch({ type: 'SET_VIRTUAL_SPORT_LIST', payload: data })
}

const setTournamentList = (data, props) => {
    props.dispatch({ type: 'ADD_TO_VIRTUAL_VIRTUAL_TOURNAMENT_LIST', payload: data })
}

const showTournament = (index, props) => {
    let data = props.state.tournamentList;
    let tournamentId = Object.keys(data)[index];
    let getdate = new Date(data[tournamentId].second);

    if (getdate > Date.now()) {
        props.dispatch({ type: 'ADD_VIRTUAL_TOURNAMENT_ID', payload: tournamentId });
    }
    else {
        // props.dispatch({ type: 'DELETE_TOURNAMENT_FORM_LIST', payload: tournamentId });
        if (Object.keys(data).length > index + 1) {
            showTournament(index + 1, props)
        }
    }
}

const changeSubscribeDataList = (data, props) => {
    if (data.tournament.expireDate > Date.now()) {
        props.dispatch({ type: 'ADD_VIRTUAL_TOURNAMENTS_DATA', payload: data })
    }
    // checkTimeLine(data, props);
}

const changeCurrentData = (data, props) => {
    if (data) {
        props.dispatch({ type: 'ADD_CURRENT_VIRTUAL_TOURNAMENT_DATA', payload: data })
    }
}

const clearTournamentList = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_VIRTUAL_TOURNAMENT_LIST' })
}


const checkTimeLine = (props) => {
    if (
        props.state.tournamentList
        && props.state.tournamentId
        && props.state.tournamentList[props.state.tournamentId]
        && props.state.tournamentList[props.state.tournamentId].second < Date.now()
    ) {
        inactiveTournament(props.state.tournamentId, props);
        showTournament(0, props)
    }
}

const inactiveTournament = (tournamentId, props) => {
    deleteOdd(tournamentId, props);
    deleteTournamentFromData(tournamentId, props);
    // unSubscribeTournamentsRequest([parseInt(tournamentId)])
}

const clearCurrentTournamentData = (props) => {
    props.dispatch({ type: 'CLEAR_CURRENT_VIRTUAL_TOURNAMENT_DATA' })
}

const clearTournamentId = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_TOURNAMENT_ID' })
}

const deleteOdd = (tournamentId, props) => {
    props.dispatch({ type: 'DELETE_TOURNAMENT_VIRTUAL_ODDS', payload: tournamentId })
}

const deleteTournamentFromData = (tournamentId, props) => {
    props.dispatch({ type: 'DELETE_VIRTUAL_TOURNAMENTS_DATA', payload: tournamentId })
}


const subscribeTournamentsRequest = (tournamentsIds) => {
    ws.send(JSON.stringify(
        {
            way: 'subscribe',
            tournamentIds: tournamentsIds
        }
    ))
}

// const unSubscribeTournamentsRequest = (tournamentId) => {
//     ws.send(JSON.stringify(
//         {
//             way: 'unsubscribe',
//             tournamentIds: tournamentId
//         }
//     ))
// }

const sportListRequest = (eventType) => {
    ws.send(JSON.stringify({ eventType: eventType }));
}

const matchListRequest = (data) => {
    if (Object.prototype.toString.call(data) === '[object Array]') {
        ws.send(data[0]);
    }
}




function mapStateToProps(state) {
    return {
        state: {
            sportList: state.virtualSportList,
            sportId: state.virtualSportId,
            tournamentList: state.virtualTournamentList,
            tournamentId: state.virtualTournamentId,
            odds: state.virtualOdds,
            currentTournamentData: state.virtualCurrentTournamentData,
            tournamentsData: state.virtualTournamentsData,
        }
    }
}

export default connect(mapStateToProps)(VirtualWebSocketConnect);