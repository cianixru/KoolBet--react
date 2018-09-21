let initialState = [];

export default function liveMenu(state = initialState, action) {
    switch (action.type) {
        case ('SET_LIVE_MENU'): {
            return action.payload
        }

        case ('CLEAR_LIVE_TOURNAMENTS_MENU'): {
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