let initialState = {};

export default function subscribeMatch(state = initialState, action) {
    switch (action.type) {
//        case 'ADD_TOURNAMENT_SUBSCRIBE': {
//            // return state.filter(item => { return item.id !== action.payload.id });
//            return action.payload;
//        }
//        case ('DELETE_TOURNAMENT_SUBSCRIBE'): {
//            if (state.tornament === action.payload )
//                return  '';
//        }
        case 'ADD_TOURNAMENT_SUBSCRIBE': {
            
            if(!Array.isArray(action.payload))
                action.payload = [action.payload];
    
            let newState = {...state};
            action.payload.map((tournamentSubscribe, index)=>{
                newState[tournamentSubscribe.tournament] = tournamentSubscribe;
            });
            return newState;
        }
        case ('DELETE_TOURNAMENT_SUBSCRIBE'): {
            const tournamentId = action.payload;
            if(state[tournamentId]){
                let newState = {...state};
                delete newState[tournamentId];
                return newState;
            }
            return state;
        }
        case ('UPDATE_TOURNAMENT_SUBSCRIBE'): {
            if(state[action.payload.tournament]){
                let newState = {...state};
                newState[action.payload.tournament] = action.payload;
                return newState;
            }
            return state;
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