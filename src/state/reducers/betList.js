let initialState = {
    stakeValue: 0,
    variousStakeValue: {},
    betlistRequest: "",
    systemRadioValue: [4],
    bankersArray: [],
    tournamentsCount: [],
}

export default function betList(state = initialState, action) {
    switch(action.type) {
        case 'SAME_STAKE': {
            return {
                ...state,
                stakeValue: action.payload
            }
        }
        case 'VARIOUS_STAKE': {
            return {
                ...state,
                variousStakeValue: {...state.variousStakeValue, [action.id]: action.payload}
            }
        }
        case 'SYSTEM_RADIO_VALUE': {
            return {
                ...state,
                systemRadioValue: action.payload
            }
        }
        case 'TOURNAMENTS_COUNT': {
            return {
                ...state,
                tournamentsCount: [...state.tournamentsCount, action.payload]
            }
        }
        case('BETLIST'): {
            return {
                ...state,
                betlistRequest: action.payload
            }
        }
        case('BANKERS_ARRAY'): {
            return {
                ...state,
                bankersArray: [...state.bankersArray, action.payload]
            }
        }
        case('BANKERS_ARRAY_REMOVE'): {
            return {
                ...state,
                bankersArray: state.bankersArray.filter(item => item !== action.payload)
            }
        }

        case ('CLEAR_BETLIST'): {
            return {
                ...state,
                stakeValue: 0,
                variousStakeValue: {},
                betlistRequest: "",
                bankersArray: [],
            }
        }
        default:
            return state;
    }
}