import {API} from 'aws-amplify';

export async function resetPasswordApi(queryObj: any) {
  return API.post('Backend', "/user/resetPassword", {body: queryObj});
}
export async function forgotPasswordApi(email: any) {
  return API.post('Backend', "/user/forgotPassword", {body: email});
}
export async function resendVerifyEmailApi(email: any) {
  return API.post('Backend', "/user/resendVerify", {body: email});
}
export async function verifyApi(token: any) {
  return API.post('Backend', "/user/verify", {body: token});
}
export async function loginUserApi(user: any) {
  return API.post('Backend', "/user/login", {body: user});
}
