import { PureComponent } from 'react';
import { connect } from "react-redux";
import pako from "pako";

// import SockJS from 'sockjs-client';
import { SportWS } from 'config/constants';
import { SportWS_Postfix } from 'config/params';
// import CleanMatchData from 'view/Utils/CleanMatchData';

// import { cleanMatchData } from 'state/actions/action'
// import LiveWebSocket from './LiveWebSocket'

let ws;
let liveMatches = {};
let liveSportList = [];
// let firstSubscribe = true;

class SportWebSocketConnect extends PureComponent {
    
    state = {
        matchesAlreadySubscribes : []
    };
    
    componentWillUnmount() {
        ws.close();
        // this.props.dispatch(cleanMatchData())
    }

    componentDidMount() {
        if (!ws || ws.readyState !== 1) {
            ws = new WebSocket(SportWS + "/" + this.props.intl.locale + SportWS_Postfix); //TODO: switch to SockJS when backend afford this
            this.props.dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: "Today" })
        }
        WSConnect(this.props);
    }
    
    static getDerivedStateFromProps(props, state) {
        if (ws && ws.readyState === 1)
        {
            if (state && props.state.activeCategory !== state.prevActiveCategory && props.state.activeCategory !== '') {
                getSportMenu(props.state.activeCategory)
            }
            
            if('subscribeMatch' in props.state){
                const subscribeMatches = props.state.subscribeMatch;
                const subscribeMatchesIds = Object.keys(subscribeMatches);
                // do subscribe on new added tournaments
                subscribeMatchesIds.map((tournamantId)=>{
                    const subscribeMatch = subscribeMatches[tournamantId];
                    if (!state.matchesAlreadySubscribes.includes(tournamantId)){
                        subscribeTournamentsRequest(subscribeMatch)
                        state.matchesAlreadySubscribes.push(tournamantId);
                    }
                });
                // do unsubscribe deselected tournaments
                state.matchesAlreadySubscribes.map((tournamantId)=>{
                    if (!subscribeMatchesIds.includes(tournamantId)){
                        const indexDel = state.matchesAlreadySubscribes.indexOf(tournamantId);
                        if (indexDel > -1) {
                            state.matchesAlreadySubscribes.splice(indexDel, 1);
                        }
                    }
                });
            }
            WSConnect(props);
        }
        return {
            ...state,
            prevTournament: props.state.tournamentId,
            prevActiveCategory: props.state.activeCategory
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
    
    if (data.hasOwnProperty('zip') && data.zip) {
        data.data = decodeMessage(data.data);
    }

    // Get Sport list
    switch (data.channel) {
        case 'sport': {
            if (data.data.hasOwnProperty('sports')) {
                setSportList(data.data, props);
            }
            if (data.data.hasOwnProperty('key') && data.data.key.key === 'menu') {
                setSportList(data.data.value, props);
            }
            else if (data.data.hasOwnProperty('value') && data.data.value.length > 0) {
                
                let savedata = {
                    tournament: {
                        tournamentId: data.data.key.tournament,
                        value: data.data.value
                    }
                };
                changeSubscribeDataList(savedata, props);
                changeCurrentData(savedata, props);
                // if (props.channel === data.channel) {
                // }
            }
        }
            break;

        case 'live':
            setLiveData(data.data, props);
            // if (props.channel === data.channel) {

            // }
            break;

        default:
            break;
    }
};

const setSportList = (data, props) => {
    props.dispatch({ type: 'SET_SPORT_LIST', payload: data })
};

const changeSubscribeDataList = (data, props) => {
    props.dispatch({ type: 'ADD_TOURNAMENTS_DATA', payload: data })
};

const changeCurrentData = (data, props) => {
    props.dispatch({ type: 'ADD_SPORT_CURRENT_TOURNAMENT_DATA', payload: data })
};

const subscribeTournamentsRequest = (tournament) => {
    if (Object.keys(tournament).length > 0)
        ws.send(JSON.stringify(tournament))
};

const getSportMenu = (category) => {
    if (category)
        ws.send(JSON.stringify({ "channel": "sport", "key": "menu", "date": category }))
};

const setLiveData = (data, props) => {
    
    if (data.hasOwnProperty('matches')) {
        data.matches.map(match => {
            if (match.Markets.length > 0)
                liveMatches[match.matchid] = match;
            else {
                props.dispatch({ type: 'DELETE_MATCH_ODDS', payload: match.matchid })
                delete liveMatches[match.matchid]
            }
            let odd = props.state.odds.find(e => e.matchId === match.matchid)
            if (odd) {
                if (!match.Markets.some(e => e.id === odd.betDomainId)) {
                    // console.log(match);
                    props.dispatch({ type: 'DELETE_MATCH_ODDS', payload: match.matchid })
                }
            }

            let liveCountries = [];

            if (liveSportList.find(e => e.sportname === match.sportname)) {
                liveCountries = liveSportList.find(e => e.sportname === match.sportname).country.filter(e => e !== match.country)
            }

            liveSportList = liveSportList.filter(e => e.sportname !== match.sportname);
            liveSportList = [...liveSportList, { sportname: match.sportname, country: [...liveCountries, match.country].sort() }]
            liveSportList.sort((a, b) => {
                if (a.sportname > b.sportname && a.sportname !== 'Soccer') {
                    return 1;
                }
                if (b.sportname === 'Soccer') {
                    return 1;
                }
            })

        })
    }
    // console.log(liveMatches);
    
    if (JSON.stringify(liveMatches) !== JSON.stringify(props.state.liveMatches)) {
        props.dispatch({ type: 'ADD_LIVE_TOURNAMENTS_DATA', payload: liveMatches })
    }


    if (JSON.stringify(liveSportList) !== JSON.stringify(props.state.liveMenu)) {
        // console.log(liveSportList);
        // console.log(props.state.liveMenu);
        props.dispatch({ type: 'SET_LIVE_MENU', payload: liveSportList })
    } 
 
};


function decode(str) {
    let strData = atob(str);
    let charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
    let binData = new Uint8Array(charData);
    let pakoData = pako.inflate(binData);
    return utf8ArrayToStr(pakoData);
}

function decodeMessage(str) {
    return JSON.parse(decode(str));
}

function utf8ArrayToStr(array) {
    let out, i, len, c;
    let char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
            default:
                break;
        }
    }

    return out;
}

function mapStateToProps(state) {
    return {
        state: {
            sportList: state.sportList,
            activeCategory: state.activeCategory,
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
        },
        intl : {
            locale: state.intl.locale
        }
    }
}

export default connect(mapStateToProps)(SportWebSocketConnect);