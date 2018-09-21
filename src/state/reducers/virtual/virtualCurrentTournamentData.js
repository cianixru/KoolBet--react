let initialState = [];

export default function currentTournamentData(state = initialState, action) {

    switch (action.type) {
        case ('ADD_CURRENT_VIRTUAL_TOURNAMENT_DATA'):
            return action.payload;
            break;

        case ('ADD_SPORT_CURRENT_VIRTUAL_TOURNAMENT_DATA'):
            state = state.filter(e => e.tournament.tournamentId !== action.payload.tournament.tournamentId);
            return [...state, action.payload];
            break;

        case ('DELETE_SPORT_CURRENT_VIRTUAL_TOURNAMENT_DATA'):
            return state = state.filter(e => e.tournament.tournamentId !== action.payload.tournament.tournamentId);
            break;

        case ('CLEAR_CURRENT_VIRTUAL_TOURNAMENT_DATA'):
            return [];
            break;

        case ('CLEAN_MATCH_DATA'):
            return [];
            break;

        default:
            return state;
            break;
    }
}