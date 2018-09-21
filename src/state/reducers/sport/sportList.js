let initialState = [];

export default function sportList(state=initialState, action) {
    
    switch(action.type){
        case('SET_SPORT_LIST'):
            return action.payload;
        break;

        case('CLEAR_SPORT_LIST'):
            return [];
        break;

        case('CLEAN_MATCH_DATA'):
            return [];
        break;

        default:
            return state;
        break;        
    }
}