// import * as CONSTANTS from "../../../constants/baseUrl";
import API from "../../../lib/Api";

// export function* login(user: any) {
//   const opt = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   };
//   const response = yield fetch(`${CONSTANTS.BASE_URL}/user/login`, opt);
//   const message = yield response.json();
//   return yield { status: response.status, data: message };
// }
// export function* verify(token: any) {
//   const opt = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(token),
//   };
//   const response = yield fetch(`${CONSTANTS.DEV_URL}/user/verify`, opt);
//   const message = yield response.json();
//   return yield { status: response.status, data: message };
// }
// export function* resendEmail(email: any) {
//   const opt = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(email),
//   };
//   const response = yield fetch(`${CONSTANTS.DEV_URL}/user/resendVerify`, opt);
//   const message = yield response.json();
//   return yield { status: response.status, data: message };
// }
// export function* forgot(token: any) {
//   const opt = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(token),
//   };
//   const response = yield fetch(
//     `${CONSTANTS.DEV_URL}/user/forgotPassword`,
//     opt
//   );
//   const message = yield response.json();
//   return yield { status: response.status, data: message };
// }

// export function* reset(token: any) {
//   const opt = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(token),
//   };
//   const response = yield fetch(`${CONSTANTS.DEV_URL}/user/resetPassword`, opt);
//   const message = yield response.json();
//   return yield { status: response.status, data: message };
// }
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