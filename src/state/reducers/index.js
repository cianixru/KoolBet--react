import { combineReducers } from "redux";

import isAuthenticated from './isAuthenticated';


// Sport
import sportList from './sport/sportList';
import sportId from './sport/sportId';
import tournamentId from './sport/tournamentId';
import currentTournamentData from './sport/currentTournamentData';
import tournamentsData from './sport/tournamentsData';
import tournamentList from './sport/TournamentList';
import odds from './sport/odds';

// Virtual
import virtualSportList from './virtual/virtualSportList';
import virtualSportId from './virtual/virtualSportId';
import virtualTournamentId from './virtual/virtualTournamentId';
import virtualCurrentTournamentData from './virtual/virtualCurrentTournamentData';
import virtualTournamentsData from './virtual/virtualTournamentsData';
import virtualTournamentList from './virtual/virtualTournamentList';
import virtualOdds from './virtual/virtualOdds';

import liveMatches from './liveMatches';
import liveMenu from './liveMenu';

import subscribeMatch from './subscribeMatch';
import bsTabs from './bsTabs';
import betSlip from './betSlip';
import betList from './betList';
import vgConfig from './vgConfig';

export default combineReducers({

    //Auth 
    isAuthenticated,

    // 
    odds,
    
    //New struct
    ///Sport
    sportList,
    sportId,
    tournamentId,
    currentTournamentData,
    tournamentsData,
    tournamentList,
    liveMatches,
    liveMenu,
    ///Virtual
    virtualSportList,
    virtualSportId,
    virtualTournamentId,
    virtualCurrentTournamentData,
    virtualTournamentsData,
    virtualTournamentList,
    virtualOdds,
      
    subscribeMatch,

    //BetSlip 
    bsTabs,
    betSlip,
    betList,

    vgConfig

})