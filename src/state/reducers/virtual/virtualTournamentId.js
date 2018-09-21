let initialState = '';

export default function tournamentId(state=initialState, action) {
    
    switch(action.type){
        case('ADD_VIRTUAL_TOURNAMENT_ID'):
            return action.payload;
        break;

        case('CLEAR_VIRTUAL_TOURNAMENT_ID'):
            return '';
        break;

        case('CLEAN_MATCH_DATA'):
            return '';
        break;

        default:
            return state;
        break;        
    }
}