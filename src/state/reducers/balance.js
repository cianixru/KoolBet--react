let initialState = { amount: 0 };

export default function balance(state = initialState, action) {
    switch (action.type) {
        case ('SET_BALANCE'):
            return action.payload;
        default:
            return state;
    }
}