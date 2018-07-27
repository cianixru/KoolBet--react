let initialState = {
    prematch: { '1': [1, 2, 3, 4, 5], '2': [1, 2, 3, 4], '3': [1, 2, 3, 4, 5, 6, 7], '4': [1, 2, 3, 4, 5, 6], '5': [1, 2,], '6': [1, 2, 3,] },
    live: { '7': [5, 4, 3, 2, 1], '8': [6, 5, 4, 3, 2, 1], '9': [4, 3, 2, 1], '10': [9, 8, 7, 6, 5, 4, 3, 2, 1], '11': [7, 6, 5, 4, 3, 2, 1], '12': [8, 7, 6, 5, 4, 3, 2, 1], '13': [1] }
}

export default function tableMatches(state = initialState, action) {

    switch (action.type) {
        default:
            return {
                ...state,
            };
            break;
    }
}