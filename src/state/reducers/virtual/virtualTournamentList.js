let initialState = {};

export default function currentVGTournamentList(state=initialState, action) {
    
    switch(action.type){
        case('ADD_TO_VIRTUAL_VIRTUAL_TOURNAMENT_LIST'):
            return Object.assign({}, state, action.payload);

        case('DELETE_VIRTUAL_VIRTUAL_TOURNAMENT_FORM_LIST'):
            delete state[action.payload];
            return {...state};

        case('CLEAR_VIRTUAL_VIRTUAL_TOURNAMENT_LIST'):
            return {};

        case('CLEAN_MATCH_DATA'):
            return {};

        default:
            return state;        
    }
}