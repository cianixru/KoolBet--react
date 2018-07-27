import { combineReducers } from "redux";

import preMatches from './preMatches';
import liveMatches from './liveMatches';
import bsTabs from './bsTabs';
import currentPage from './currentPage';
// import tableMatches from './tableMatches';
import matchCategoriesSelected from './matchCategoriesSelected';
import TournamentsSelected from './TournamentsSelected';
import authorisePage from './authorisePage';

export default combineReducers({
    currentPage,
    preMatches,
    liveMatches,
    // tableMatches,
    bsTabs,
    matchCategoriesSelected,
    TournamentsSelected,
    authorisePage,
})