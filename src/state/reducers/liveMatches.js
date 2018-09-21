let initialState = {};

export default function liveMatches(state = initialState, action) {
    switch (action.type) {
        case ('ADD_LIVE_TOURNAMENTS_DATA'): {
            return {...action.payload}
        }

        case ('CLEAR_LIVE_TOURNAMENTS_DATA'): {
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