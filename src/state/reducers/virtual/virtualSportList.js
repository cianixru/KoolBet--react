let initialState = [];

export default function sportList(state=initialState, action) {
    
    switch(action.type){
        case('SET_VIRTUAL_SPORT_LIST'):
            return action.payload;

        case('CLEAR_VIRTUAL_SPORT_LIST'):
            return [];

        case('CLEAN_MATCH_DATA'):
            return [];

        default:
            return state;
       
    }
}