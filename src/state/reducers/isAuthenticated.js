let initialState = false;

export default function isAuthenticated(state = initialState, action) {
    switch (action.type) {
        case ('AUTHORIZATION'):
            return action.payload;
        default:
            return state;
    }
}