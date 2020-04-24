import { types, AuthState } from "../Types/auth";

let initialState: AuthState = {
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                loginError: false
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loggedInStatus: true,
                loading: false,
                loginError: null,
                token: action.payload.token
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loggedInStatus: false,
                loading: false,
                loginError: action.payload.message,
            };
        case types.UPDATE_USER:
            return { ...state, user: action.payload }
        case types.LOUGOUT_SUCCESS:
            return {
                ...state,
                loggedInStatus: false,
            }
        default: {
            return state;
        }
    }
};

export default authReducer;
