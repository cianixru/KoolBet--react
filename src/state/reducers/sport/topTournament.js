let initialState = {currentTournamentCounter:0,currentTopTournament:null};

export default function topTournament(state=initialState, action) {

    switch(action.type){

          case 'TOURNAMENT_COUNTER_ADD':

                       return Object.assign({}, state, {
                         currentTournamentCounter: ++state.currentTournamentCounter,
                         currentTopTournament:null
                       })

           case 'TOURNAMENT_COUNTER_SUB':
                        return Object.assign({}, state, {
                          currentTournamentCounter: state.currentTournamentCounter>0?--state.currentTournamentCounter:state.currentTournamentCounter
                        })

         case 'TOURNAMENT_COUNTER_CLEAR':

                       return Object.assign({}, state, {
                         currentTournamentCounter: 0
                       })

         case 'TOP_TOURNAMENT_ID':

                             return Object.assign({}, state, {
                                currentTopTournament: action.payload
                             })

        default:
            return state;
    }
}
