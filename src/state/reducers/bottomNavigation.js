let initialState = {
    bnAction: 0,    
}

export default function bottomNavigation(state = initialState, action) {
    switch(action.type) {
        case 'BN_ACTION': {
            return {
                ...state,
                bnAction: action.payload
            }
        }
        default:
            return state;
    }
}