let initialState = [];

export default function subscribedVG(state = initialState, action) {
    switch (action.type) {
        case 'ADD_SUBSCRIBE': {
            if (state.includes(action.payload)) {
                state.splice(state.indexOf(action.payload), 1);
            }
            return [
                ...state, action.payload
            ];
        }

        case ('DELETE_SUBSCRIBE'): {
            return state.filter(item => { return item !== action.payload });
        }

        case ('CLEAR_SUBSCRIBE_LIST'): {
            return [];
        }


        default: {
            return state;
        }
    }
}