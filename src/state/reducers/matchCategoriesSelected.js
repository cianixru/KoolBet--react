export default function matchCategoriesSelected(state = [], action) {

    switch (action.type) {
        case 'ADD_CATEGORY': {
            state = state.filter(e => e !== action.payload);
            return [
                ...state, action.payload
            ];
        }
        case ('DELETE_CATEGORY'): {
            return state = state.filter(e => e !== action.payload);;
        }
        case ('CLEAR_CATEGORY_LIST'): {
            return [];
        }

        default: {
            return state;
        }
    }

}