export default function matchCategoriesSelected(state=[], action) {
    
    switch(action.type){
        case 'ADD_CATEGORY': {
            return [
                ...state, action.payload
            ];
        }
        case('DELETE_CATEGORY'):{
            state.splice(state.indexOf(action.payload),1);
            return [
                ...state
            ];
        }
        case('CLEAR_CATEGORY_LIST'):{
            return [];
        }
        
        default: {
            return state;
        }
    }

}