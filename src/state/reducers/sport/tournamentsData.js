let initialState = [];

export default function tournamentsData(state = initialState, action) {
    switch (action.type) {
        case ('ADD_TOURNAMENTS_DATA'): {
            state = state.filter(e => e.tournament.tournamentId !== action.payload.tournament.tournamentId);
            return [
                ...state, action.payload
            ];

        }

        case ('DELETE_TOURNAMENTS_DATA'): {
            return state = state.filter(e => e.tournament.tournamentId != action.payload); //.tournament.tournamentId ?
        }

        case ('CLEAR_TOURNAMENTS_DATA'): {
            return [];
        }

        case ('CLEAN_MATCH_DATA'): {
            return [];
        }

        default: {
            return state;
        }
    }
}