const INITIAL_STATE = {
    loading: false,
    data: [],
    error: null,
}

function favorites(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_FAVORITE_REQUEST':
            return { ...state, loading: true }
        case 'ADD_FAVORITE_SUCCESS':
            return { ...state, loading: false, error: null, data: [...state.data, action.payload.data] }
        case 'ADD_FAVORITE_FAILURE':
            return { ...state, loading: false, error: action.payload.error }
        default:
            return state
    }
}

export default favorites
