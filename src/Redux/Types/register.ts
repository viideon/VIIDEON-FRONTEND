const REGISTRATION_REQUEST: string = "REGISTRATION_REQUEST";
const REGISTRATION_SUCCESS: string = "REGISTRATION_SUCCESS";
const REGISTRATION_FAILURE: string = "REGISTRATION_FAILURE";

export const types = {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE
};
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}
export interface RegisterState {
  user?: User;
  success?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  isSignupSuccess?: boolean;
}
export interface RegisterAction {
  type: typeof REGISTRATION_REQUEST;
  payload: User;
}
