let initialState = [];

export default function preMatches(state=initialState, action) {
    switch(action.type){
        case 'ADD_PRE_MATCH': {
            return [
                ...state, action.payload
            ];
        }
        case('DELETE_PRE_MATCH'):{
            state.splice(state.indexOf(action.payload),1);
            return [
                ...state
            ];
        }
        case('CLEAR_PRE_MATCH_LIST'):{
            return [];
        }
        
        
        default: {
            return state;
        }
    }
}