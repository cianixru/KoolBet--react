import { PureComponent } from 'react';
import { connect } from "react-redux";

// import { cleanMatchData } from 'state/actions/action'

import SockJS from 'sockjs-client';
import { KironWS } from 'config/constants';

let ws;
let refreshIntervalId;
let now;

class VirtualWebSocketConnect extends PureComponent {

    state = { initialSubscribed: true }

    componentWillUnmount() {
        ws.close();
    }

    componentDidMount() {
        if (!ws || ws.readyState !== 1) {
            ws = new SockJS(KironWS + '?lang=en');
        }
        WSConnect(this.props)
    }

    static getDerivedStateFromProps(props, state) {
        if (ws && ws.readyState === 1) {
            clearInterval(refreshIntervalId);
            refreshIntervalId = setInterval(() => checkTimeLine(props), 1000);
            WSConnect(props);

            if (state.initialSubscribed) {
                if (props.state.tournamentId)
                    subscribeTournamentsRequest(props.state.sportId, [parseInt(props.state.tournamentId, 10)])
                subscribeOdds(props);
                state.initialSubscribed = false
            }

            if (props.state.nowDiff !== Date.now() + props.state.nowDiff) {
                now = Date.now() + props.state.nowDiff;
            }

            if (Object.keys(props.state.sportList).length > 0 && JSON.stringify(props.state.sportList) !== JSON.stringify(state.prevSportList)) {
                (props.state.sportId && props.state.sportId !== '')
                    ? sportListRequest(props.state.sportId)
                    : props.dispatch({ type: 'ADD_VIRTUAL_SPORT_ID', payload: props.state.sportList[0] })
            }

            if (Object.keys(props.state.tournamentList).length > 0 && JSON.stringify(props.state.tournamentList) !== JSON.stringify(state.prevTournamentList)) {
                showTournament(0, props);
            }
            if (props.state.tournamentId.length > 0 && props.state.tournamentId !== state.prevTournamentId) {
                subscribeTournamentsRequest(props.state.sportId, [parseInt(props.state.tournamentId, 10)])
            }
            if (Array.isArray(props.state.tournamentsData) && props.state.tournamentsData.length > 0 && props.state.tournamentsData !== state.prevTournamentsData) {
                changeCurrentData(props.state.tournamentsData.find(e => e.tournament.tournamentId.toString() === props.state.tournamentId.toString()), props);
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
                // clearCurrentTournamentData(props);
                // clearAllVirtualTournamentData(props);
                // clearTournamentTimeLineList(props);
                // clearTournamentId(props);
                // clearSportList(props);
                // clearSportId(props);
                // clearVirtualOdds(props);
                // setTimeout(WSConnect(props), 1000);
            };
            ws.onclose = function (event) {
                if (event.wasClean) {
                    console.log('%c Connection refused clean ', 'background: #900;');
                } else {
                    console.log('%c Connection refused not clean ', 'background: #900;');
                }
                // clearCurrentTournamentData(props);
                // clearAllVirtualTournamentData(props);
                // clearTournamentTimeLineList(props);
                // clearTournamentId(props);
                // clearSportList(props);
                // clearSportId(props);
                // clearVirtualOdds(props);
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
    else if ('now' in data) {
        setNow(data.now, props)
    }
    else if ('tournamentIds' in data && Object.keys(data.tournamentIds).length > 0) {
        setTournamentList(data.tournamentIds, props)
    }
    // else if ('tournaments' in data && 'tournamentIds' in Object.values(data.tournaments)[0] && Object.keys(Object.values(data.tournaments)[0].tournamentIds).length > 0) {
    //     setTournamentList(Object.values(data.tournaments)[0].tournamentIds, props)
    // }
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
        if (!subOdds.includes(parseInt(e.tournamentId, 10)))
            subOdds.push(parseInt(e.tournamentId, 10))
    })
    subOdds.map(odd => {
        if (props.state.tournamentsData.find(e => e.tournament.tournamentId === odd).tournament.expireDate < now)
            subOdds = subOdds.filter(e => e !== odd)
    })
    if (subOdds.length > 0)
        subscribeTournamentsRequest(props.state.sportId, subOdds)
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

    if (getdate > now) {
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
    if (data.tournament.expireDate > now) {
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

const setNow = (now, props) => {
    props.dispatch({ type: 'SET_NOW_DIFF', payload: Date.now() - now })
}


const checkTimeLine = (props) => {
    if (
        props.state.tournamentList
        && props.state.tournamentId
        && props.state.tournamentList[props.state.tournamentId]
        && props.state.tournamentList[props.state.tournamentId].second < (now)
    ) {
        inactiveTournament(props.state.tournamentId, props);
        showTournament(0, props)
    }
}

const inactiveTournament = (tournamentId, props) => {
    deleteOdd(tournamentId, props);
    deleteTournamentFromData(tournamentId, props);
    // unSubscribeTournamentsRequest([parseInt(tournamentId, 10)])
}

const clearCurrentTournamentData = (props) => {
    props.dispatch({ type: 'CLEAR_CURRENT_VIRTUAL_TOURNAMENT_DATA' })
}

const clearAllVirtualTournamentData = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_TOURNAMENTS_DATA' })
}

const clearTournamentTimeLineList = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_VIRTUAL_TOURNAMENT_LIST' })
}

const clearTournamentId = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_TOURNAMENT_ID' })
}

const clearSportList = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_SPORT_LIST' })
}

const clearSportId = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_SPORT_ID' })
}

const clearVirtualOdds = (props) => {
    props.dispatch({ type: 'CLEAR_VIRTUAL_ODD_LIST' })
}

const deleteOdd = (tournamentId, props) => {
    props.dispatch({ type: 'DELETE_TOURNAMENT_VIRTUAL_ODDS', payload: tournamentId })
}

const deleteTournamentFromData = (tournamentId, props) => {
    props.dispatch({ type: 'DELETE_VIRTUAL_TOURNAMENTS_DATA', payload: tournamentId })
}


const subscribeTournamentsRequest = (sportType, tournamentsIds) => {
    ws.send(JSON.stringify(
        {
            way: 'subscribe',
            sportType: sportType,
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
    console.log(data);
    if (Object.prototype.toString.call(data) === '[object Array]') {
        ws.send(data[0]);
    }
}




function mapStateToProps(state) {
    return {
        state: {
            nowDiff: state.nowDiff,
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