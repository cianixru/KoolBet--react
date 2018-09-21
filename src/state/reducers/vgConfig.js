let initialState = {
    streemVideo: true,
}

export default function vgConfig(state = initialState, action) {
    switch (action.type) {
        case 'VG_STREEM_VIDEO': {
            return {
                ...state,
                streemVideo: action.payload
            }
        }
        default: {
            return state;
        }
    }
}