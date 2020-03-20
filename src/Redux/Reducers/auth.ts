import { types, AuthState } from "../Types/auth";

let initialState: AuthState = {

};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                loginError:false
            };
        case types.LOGIN_SUCCESS:
            console.log("in reducer", action.payload)
            return {
                ...state,
                user: action.payload,
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
        default: {
            return { ...state };
        }
    }
};

export default authReducer;
