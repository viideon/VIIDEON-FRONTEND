const LOGIN_REQUEST: string = "LOGIN_REQUEST";
const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
const LOGIN_FAILURE: string = "LOGIN_FAILURE";
const LOUGOUT: string = "LOUGOUT";

export const types = {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOUGOUT
}
interface Us {
    _id: string
    firstName: string
    lastName: string
    mobileNumber: string
    timeZone: string
    title: string
    userName: string
    affiliateId: string
    businessPhone: string
    email: string
    webAddress: string
    url: string
}
export interface User {
    user?: Us
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