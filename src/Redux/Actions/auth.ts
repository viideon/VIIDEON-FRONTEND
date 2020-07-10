import { types, User, LoginAction } from "../Types/auth";

export function loginUser(user: User): LoginAction {
  return {
    type: types.LOGIN_REQUEST,
    payload: user,
  };
}

export function verifyUser(token: any) {
  console.log("token ac", token);
  return {
    type: types.VERIFY_REQUEST,
    payload: token,
  };
}

export function forgotPassword(email: any) {
  console.log("forgot ac", email);
  return {
    type: types.FORGOT_REQUEST,
    payload: email,
  };
}
export function resetPassword(pass: any) {
  console.log("reset ac", pass);
  return {
    type: types.RESET_REQUEST,
    payload: pass,
  };
}
export function resendEmail(email: any) {
  console.log("resend email ac", email);
  return {
    type: types.RESEND_EMAIL_REQUEST,
    payload: email,
  };
}

export function logout() {
  return {
    type: types.LOUGOUT,
  };
}
