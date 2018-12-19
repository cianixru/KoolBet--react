let initialState = '';

export default function country(state=initialState, action) {
    
    switch(action.type){
        case('ADD_COUNTRY'):
            return action.payload;

        case('CLEAR_COUNTRY'):
            return '';

        case('CLEAN_MATCH_DATA'):
            return '';

        default:
            return state;
    }
}