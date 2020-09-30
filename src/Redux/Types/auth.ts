const LOGIN_REQUEST: string = "LOGIN_REQUEST";
const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
const LOGIN_FAILURE: string = "LOGIN_FAILURE";
const LOUGOUT: string = "LOUGOUT";
const LOGOUT_REQ: string = "LOGOUT_REQ";
const LOUGOUT_SUCCESS: string = "LOUGOUT_SUCCESS";

const RESEND_EMAIL_REQUEST: string = "RESEND_EMAIL_REQUEST";
const RESEND_EMAIL_SUCCESS: string = "RESEND_EMAIL_SUCCESS";
const RESEND_EMAIL_FAILURE: string = "RESEND_EMAIL_FAILURE";

const UPDATE_USER: string = "UPDATE_USER";
const VERIFY_REQUEST: string = "VERIFY_REQUEST";
const VERIFY_SUCCESS: string = "VERIFY_SUCCESS";
const VERIFY_FAILURE: string = "VERIFY_FAILURE";

const FORGOT_REQUEST: string = "FORGOT_REQUEST";
const FORGOT_SUCCESS: string = "FORGOT_SUCCESS";
const FORGOT_FAILURE: string = "FORGOT_FAILURE";

const RESET_REQUEST: string = "RESET_REQUEST";
const RESET_SUCCESS: string = "RESET_SUCCESS";
const RESET_FAILURE: string = "RESET_FAILURE";

const RESET_FORGOT_SUCCESS_VARIABLE: string = "RESET_FORGOT_SUCCESS_VARIABLE";
const RESET_EMAIL_VERIFIED_VARIABLE: string = "RESET_EMAIL_VERIFIED_VARIABLE";

export const types = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOUGOUT,
  LOGOUT_REQ,
  UPDATE_USER,
  LOUGOUT_SUCCESS,
  VERIFY_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  FORGOT_FAILURE,
  FORGOT_SUCCESS,
  FORGOT_REQUEST,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
  RESEND_EMAIL_FAILURE,
  RESEND_EMAIL_REQUEST,
  RESEND_EMAIL_SUCCESS,
  RESET_FORGOT_SUCCESS_VARIABLE,
  RESET_EMAIL_VERIFIED_VARIABLE
};
interface Us {
  _id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  timeZone: string;
  title: string;
  userName: string;
  affiliateId: string;
  businessPhone: string;
  email: string;
  webAddress: string;
  url: string;
}
export interface User {
  user?: Us;
  email: string;
  password: string;
}

export interface AuthState {
  // user?: User;;
  user?: Us;
  loggedInStatus?: boolean;
  loading?: boolean;
  loginError?: string;
  token?: string;
}
export interface LoginAction {
  type: typeof LOGIN_REQUEST;
  payload: User;
}
