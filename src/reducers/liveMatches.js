let initialState = [];

export default function liveMatches(state=initialState, action) {
    switch(action.type){
        case 'ADD_LIVE_MATCH': {
            return [
                ...state, action.payload
            ];
        }
        case('DELETE_LIVE_MATCH'):{
            state.splice(state.indexOf(action.payload),1);
            return [
                ...state
            ];
        }
        case('CLEAR_LIVE_MATCH_LIST'):{
            return [];
        }
        
        default: {
            return state;
        }
    }
}