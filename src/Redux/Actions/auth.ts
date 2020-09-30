import { types, User, LoginAction } from "../Types/auth";

export function loginUser(user: User): LoginAction {
  return {
    type: types.LOGIN_REQUEST,
    payload: user
  };
}

export function verifyUser(token: any) {
  return {
    type: types.VERIFY_REQUEST,
    payload: token
  };
}

export function forgotPassword(email: any) {
  return {
    type: types.FORGOT_REQUEST,
    payload: email
  };
}
export function resetPassword(pass: any) {
  return {
    type: types.RESET_REQUEST,
    payload: pass
  };
}
export function resendEmail(email: any) {
  return {
    type: types.RESEND_EMAIL_REQUEST,
    payload: email
  };
}
export function resetEmailVerifiedVariable() {
  return {
    type: types.RESET_EMAIL_VERIFIED_VARIABLE,
    payload: { isEmailNotVerified: null }
  };
}
export function logout() {
  return {
    type: types.LOUGOUT
  };
}
