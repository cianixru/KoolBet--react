let initialState = '';

export default function sportId(state=initialState, action) {
    
    switch(action.type){
        case('ADD_SPORT_ID'):
            return action.payload;
        break;

        case('CLEAR_SPORT_ID'):
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