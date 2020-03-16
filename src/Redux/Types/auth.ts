 const LOGIN_REQUEST: string = "LOGIN_REQUEST";
 const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
 const LOGIN_FAILURE: string = "LOGIN_FAILURE";

export const types = {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
}
export interface User {
    email: string;
    password: string;
}

export interface AuthState {
    user?: User;
    loggedInStatus?: boolean;
    loading?: boolean;
    loginError?: string;
    token?: string;
}
export interface LoginAction {
    type: typeof LOGIN_REQUEST
    payload: User
}