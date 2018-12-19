let initialState = '';

export default function nowDiff(state=initialState, action) {
    
    switch(action.type){
        case('SET_NOW_DIFF'):
            return action.payload;

        default:
            return state;
       
    }
}