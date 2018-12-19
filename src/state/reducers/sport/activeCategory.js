let initialState = 'More';

export default function activeCategory(state = initialState, action) {

    switch (action.type) {
        case ('SET_ACTIVE_CATEGORY'):
            return action.payload;

        case ('CLEAR_ACTIVE_CATEGORY'):
            return 'More';

        case ('CLEAN_MATCH_DATA'):
            return 'More';

        default:
            return state;
    }
}