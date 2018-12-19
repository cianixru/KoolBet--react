let initialState = {currentUserData:{}};

export default function topTournament(state=initialState, action) {

    switch(action.type){

        case 'UPDATE_CURRENT_USER_DATA':

            return Object.assign({}, state, {
                currentUserData: action.data
            })


        default:
            return state;
    }
}
