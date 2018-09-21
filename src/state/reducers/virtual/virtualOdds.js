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
        case 'ADD_VIRTUAL_ODD': {
            state.filter(item => item.oddId !== action.payload.oddId)
            return [
                ...state, action.payload
            ];
        }

        case ('DELETE_VIRTUAL_ODD'): {
            return state.filter(item => item.oddId != action.payload)
        }

        case ('DELETE_TOURNAMENT_VIRTUAL_ODDS'): {
            return state.filter(item => {
                console.log(item.tournamentId +'/'+ action.payload);

                return item.tournamentId != action.payload
            })
        }

        case ('CLEAR_VIRTUAL_ODD_LIST'): {
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