let initialState = '';

export default function matchId(state=initialState, action) {
    
    switch(action.type){
        case('ADD_MATCH_ID'):
            return action.payload;

        default:
            return state;
    }
}