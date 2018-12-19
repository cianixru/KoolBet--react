let initialState = '';

export default function sportId(state=initialState, action) {
    
    switch(action.type){
        case('ADD_SPORT_ID'):
            return action.payload;

        case('CLEAR_SPORT_ID'):
            return '';

        case('CLEAN_MATCH_DATA'):
            return '';

        default:
            return state;

    }
}