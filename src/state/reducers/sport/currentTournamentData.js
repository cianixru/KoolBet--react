let initialState = [];

export default function currentTournamentData(state = initialState, action) {

    switch (action.type) {
        case ('ADD_CURRENT_TOURNAMENT_DATA'):
            return action.payload;

        case ('ADD_SPORT_CURRENT_TOURNAMENT_DATA'):
            state = state.filter(e => e.tournament.tournamentId !== action.payload.tournament.tournamentId);
            return [...state, action.payload];

        case ('DELETE_SPORT_CURRENT_TOURNAMENT_DATA'):
            return state = state.filter(e => e.tournament.tournamentId !== action.payload.tournament.tournamentId);

        case ('CLEAR_CURRENT_TOURNAMENT_DATA'):
            return [];

        case ('CLEAN_MATCH_DATA'):
            return [];

        default:
            return state;
    }
}