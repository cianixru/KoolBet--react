let initialState = {};

export default function currentVGTournamentList(state=initialState, action) {
    
    switch(action.type){
        case('ADD_TO_VIRTUAL_VIRTUAL_TOURNAMENT_LIST'):
            return Object.assign({}, state, action.payload);
        break;

        case('DELETE_VIRTUAL_VIRTUAL_TOURNAMENT_FORM_LIST'):
            delete state[action.payload];
            return {...state};
        break;

        case('CLEAR_VIRTUAL_VIRTUAL_TOURNAMENT_LIST'):
            return {};
        break;

        case('CLEAN_MATCH_DATA'):
            return {};
        break;

        default:
            return state;
        break;        
    }
}