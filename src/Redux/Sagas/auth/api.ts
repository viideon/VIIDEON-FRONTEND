import API from "../../../lib/Api";


export async function resetPasswordApi(queryObj: any) {
  return API.post("/user/resetPassword", queryObj);
}
export async function forgotPasswordApi(email: any) {
  return API.post("/user/forgotPassword", email);
}
export async function resendVerifyEmailApi(email: any) {
  return API.post("/user/resendVerify", email);
}
export async function verifyApi(token: any) {
  return API.post("/user/verify", token);
}
export async function loginUserApi(user: any) {
  return API.post("/user/login", user);
}