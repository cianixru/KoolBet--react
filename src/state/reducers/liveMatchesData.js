let initialState = {};

export default function liveMatchesData(state = initialState, action) {
    switch (action.type) {
        case ('ADD_LIVE_MATCH_DATA'): {
            return {...action.payload}
        }

        case ('DELETE_LIVE_MATCH_DATA'): {
            return state = state.filter(e => e.matchid !== action.payload);
        }

        case ('CLEAR_LIVE_MATCH_DATA'): {
            return {};
        }

        case ('CLEAN_MATCH_DATA'): {
            return {};
        }

        default: {
            return state;
        }
    }
}