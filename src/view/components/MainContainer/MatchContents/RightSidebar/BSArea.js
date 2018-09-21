import React, { Component } from 'react';
import { connect } from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';

import CheckboxControls from './CheckboxControls';
import BSForm from './BSForm/';
import BSTabs from './BSTabs';
// import { tournamentsCount } from './BSLogic';
import { getVal } from './BSLogic';

class BSArea extends Component {

/*     static getDerivedStateFromProps(props, state) {
     
        props.state.odds.map((arr) => {
            if (arr.type === "prematch" 
                && props.state.tournamentsData.find(e => e.tournament.tournamentId == arr.tournamentId)
                && !props.state.betList.tournamentsCount.includes(getVal(props.state.tournamentsData, arr, 3).id)) {
                props.dispatch({ type: 'TOURNAMENTS_COUNT', payload: getVal(props.state.tournamentsData, arr, 3).id })
            }
        })
        // console.log('"===>" :', props.state.betList.tournamentsCount );
        
        return { ...state }
    } */


    render() {

        const TournamentsBets = this.props.state.odds;
        const TournamentsObjLive = this.props.state.liveMatches;
        const TournamentsObj = this.props.state.tournamentsData;
        let tipSize = Object.keys(TournamentsBets).length;
        return (
            <div className="betslip-area__container">
                <div className="betslip-area__inner">
                    <div className="bs__header">
                        <div className="bs__title">Betslip</div>
                        <div className="left-col">
                            <i className="bs-hide" data-toggle="betslipArea"></i>
                        </div>
                    </div>

                    <BSTabs tournamentsCount={this.props.state.betList.tournamentsCount.length} tipSize={tipSize} />
                    {/* {console.log('tournamentsCount :', JSON.stringify(this.props.state.betList.tournamentsCount))} */}
                    <CheckboxControls />

                    <Scrollbars
                        renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                        renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                        renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                        hideTracksWhenNotNeeded={true}
                    >
                        <BSForm />
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            betSlip: state.betSlip,
            bsTabs: state.bsTabs,
            odds: state.odds,
            tournamentsData: state.tournamentsData,
            liveMatches: state.liveMatches,
            betList: state.betList,


        }
    }
}

export default connect(mapStateToProps)(BSArea);