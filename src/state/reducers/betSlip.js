let initialState = {
    tab: 0,
    advanced: false,
    sameStake: false,
}

export default function betslip(state = initialState, action) {
    switch (action.type) {
        case 'BETS_TABS': {
            return {
                ...state,
                tab: action.payload
            }
        }
        case 'CHECK_ADVANCED': {
            return {
                ...state,
                advanced: action.payload
            }
        }
        case ('CHECK_SAMESTAKE'): {
            return {
                ...state,
                sameStake: action.payload
            }
        }
        default: {
            return state;
        }
    }
}