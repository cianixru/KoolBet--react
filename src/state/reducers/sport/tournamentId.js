let initialState = '';

export default function tournamentId(state=initialState, action) {
    
    switch(action.type){
        case('ADD_TOURNAMENT_ID'):
            return action.payload;

        case('CLEAR_TOURNAMENT_ID'):
            return '';

        case('CLEAN_MATCH_DATA'):
            return '';

        default:
            return state;        
    }
}