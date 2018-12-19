let initialState = [
    // {
    //     tournamentId: '',
    //     matchId: '',
    //     betDomainId: '',
    //     oddId: '',
    // },
];

export default function oddId(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ODD': {
            state.filter(item => item.oddId !== action.payload.oddId)
            return [
                ...state, action.payload
            ];
        }

        case ('DELETE_ODD'): {
            return state.filter(item => item.oddId !== action.payload)
        }

        case ('DELETE_TOURNAMENT_ODDS'): {
            return state.filter(item => {
                return item.tournamentId !== action.payload
            })
        }

        case ('DELETE_MATCH_ODDS'): {
            return state.filter(item => item.matchId !== action.payload)
        }

        case ('CLEAR_ODD_LIST'): {
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