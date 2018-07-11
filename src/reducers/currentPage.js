let initialState = [0];

export default function bsTabs(state=initialState, action) {
    
    switch(action.type){
        case('CP_TAB_CHANGE'):
            return action.payload;
        break;

        default:
            return state;
        break;        
    }
}