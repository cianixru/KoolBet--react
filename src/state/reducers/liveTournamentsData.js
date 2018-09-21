// let initialState = [];

// export default function liveTournamentsData(state = initialState, action) {
//     switch (action.type) {
//         case ('ADD_LIVE_TOURNAMENTS_DATA'): {
//             state = state.filter(e => e.tournament.id !== action.payload.tournament.id);
//             return [
//                 ...state, action.payload
//             ];

//         }

//         case ('DELETE_LIVE_TOURNAMENTS_DATA'): {
//             return state = state.filter(e => e.tournament.id != action.payload); //.tournament.id ?
//         }

//         case ('CLEAR_LIVE_TOURNAMENTS_DATA'): {
//             return [];
//         }

//         case ('CLEAN_MATCH_DATA'): {
//             return [];
//         }

//         default: {
//             return state;
//         }
//     }
// }