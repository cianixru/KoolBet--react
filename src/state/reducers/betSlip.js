let initialState = {
    currentTab: 0,
    advanced: false,
    sameStake: false,
}

export default function betslip(state = initialState, action) {
    switch (action.type) {
        case 'CURRENT_TAB': {
            return {
                ...state,
                currentTab: action.payload
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