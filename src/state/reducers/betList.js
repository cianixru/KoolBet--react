let initialState = {
    stakeValue: "0",    
    variousStakeValue: {},
    matchObj: [],
    betlistRequest: "",
    systemRadioValue: [4],
    bankersArray: [],
    allOddsArray: [],
    tournamentsCount: [],
    virtualTournamentsCount: [],
    coefsCalcArr: [],
    tipSize: 0,
}

export default function betList(state = initialState, action) {
    switch(action.type) {
        case 'TIP_SIZE': {
            return {
                ...state,
                tipSize: action.payload
            }
        }
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
        case 'MATCH_OBJ': {
            return {
                ...state,
                matchObj: action.payload
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
                tournamentsCount: action.payload
            }
        }
        case 'VIRTUAL_TOURNAMENTS_COUNT': {
            return {
                ...state,
                virtualTournamentsCount: action.payload
            }
        }
        case('BETLIST'): {
            return {
                ...state,
                betlistRequest: action.payload
            }
        }
        case('LETTERS_ARRAY'): {
            return {
                ...state,
                lettersArr: action.payload
            }
        }
        case('COEFS_CALC_ARR'): {
            return {
                ...state,
                coefsCalcArr: action.payload
            }
        }
        case('NEW_ODDS_ARRAY'): {
            return {
                ...state,
                newOddsArray: action.payload
            }
        }
        case('ALL_ODDS_ARRAY'): {
            return {
                ...state,
                allOddsArray: action.payload
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
        case ('CLEAR_VIRTUAL_BETLIST'): {
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