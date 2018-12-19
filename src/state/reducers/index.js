import { combineReducers } from "redux";

import isAuthenticated from './isAuthenticated';


// Sport
import sportList from './sport/sportList';
import activeCategory from './sport/activeCategory';
import sportId from './sport/sportId';
import country from './sport/country';
import tournamentId from './sport/tournamentId';
import currentTournamentData from './sport/currentTournamentData';
import tournamentsData from './sport/tournamentsData';
import tournamentList from './sport/TournamentList';
import odds from './sport/odds';
import topTournament from './sport/topTournament';

// Virtual
import virtualSportList from './virtual/virtualSportList';
import virtualSportId from './virtual/virtualSportId';
import virtualTournamentId from './virtual/virtualTournamentId';
import virtualCurrentTournamentData from './virtual/virtualCurrentTournamentData';
import virtualTournamentsData from './virtual/virtualTournamentsData';
import virtualTournamentList from './virtual/virtualTournamentList';
import virtualOdds from './virtual/virtualOdds';
import nowDiff from './virtual/nowDiff';

import liveMatchesData from './liveMatchesData';
import liveMatches from './liveMatches';
import liveMenu from './liveMenu';

import subscribeMatch from './subscribeMatch';
import bsTabs from './bsTabs';
import betSlip from './betSlip';
import betList from './betList';
import vgConfig from './vgConfig';

import balance from './balance';

import bottomNavigation from './bottomNavigation';

// i18n
import { intlReducer } from 'react-intl-redux';

import userData from "./userData"

export default combineReducers({

    //Auth 
    isAuthenticated,
    userData,

    // 
    odds,

    //New struct
    ///Sport
    sportList,
    activeCategory,
    sportId,
    country,
    tournamentId,
    currentTournamentData,
    tournamentsData,
    tournamentList,
    liveMatchesData,
    liveMatches,
    liveMenu,
    topTournament,

    ///Virtual
    virtualSportList,
    virtualSportId,
    virtualTournamentId,
    virtualCurrentTournamentData,
    virtualTournamentsData,
    virtualTournamentList,
    virtualOdds,
    nowDiff,

    subscribeMatch,

    balance,
    
    bottomNavigation,

    //BetSlip 
    bsTabs,
    betSlip,
    betList,
    
    // Virtual Config
    vgConfig,
    intl : intlReducer
})