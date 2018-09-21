let initialState = {};

export default function subscribeMatch(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TOURNAMENT_SUBSCRIBE': {
            // return state.filter(item => { return item.id !== action.payload.id });
            return action.payload;
        }
        case ('DELETE_TOURNAMENT_SUBSCRIBE'): {
            if (state.tornament == action.payload )
            return  '';
        }
        case ('CLEAR_TOURNAMENT_SUBSCRIBE'): {
            return '';
        }

        case ('CLEAN_MATCH_DATA'): {
            return '';
        }


        default: {
            return state;
        }
    }
}