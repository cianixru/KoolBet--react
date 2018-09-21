import React, { PureComponent } from 'react';
import { connect } from "react-redux";

export const LiveWebSocket = (props) => {
    // console.log(props);
    return true;
}

class LiveWebSocketData extends PureComponent {

    render() {
        return true;
    }
}

const handleMessage = (event, props) => {

    // let data = JSON.parse(event.data);

    // // Get Sport list
    // if (props.channel == data.channel) {
    //     if (data.data.hasOwnProperty('sports')) {
    //         setSportList(data.data, props);
    //     }
    // }

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
            subscribeMatch: state.subscribeMatch,
        }
    }
}

export default connect(mapStateToProps)(LiveWebSocketData);
