export default function TournamentsSelected(state='', action) {
    
    switch(action.type){
        case 'ADD_TOURNAMENTS': {
            return action.payload;
        }

        case('CLEAR_TOURNAMENTS'):{
            return '';
        }
        
        default: {
            return state;
        }
    }

}