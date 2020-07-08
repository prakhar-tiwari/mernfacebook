import { SET_AUTH_USER, SET_PROFILE_IMAGE, SOCKET_INIT } from '../actions/Types';

const initialState = {
    isAuthenticated: false,
    user: {},
    socket: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                isAuthenticated: !(Object.entries(action.payload).length === 0 && action.payload.constructor === Object),
                user: action.payload
            }

        case SET_PROFILE_IMAGE:
            const userUpdated = state.user;
            userUpdated.profileImage = action.payload.profileImage
            return {
                ...state,
                user: userUpdated
            }

        case SOCKET_INIT:
            return {
                ...state,
                socket: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;