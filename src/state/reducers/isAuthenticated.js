let initialState = false;

export default function bsTabs(state=initialState, action) {
    
    switch(action.type){
        case('AUTHORIZATION'):
            return action.payload;
        break;

        default:
            return state;
        break;        
    }
}