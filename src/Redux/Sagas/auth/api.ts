import * as CONSTANTS from "../../../constants/baseUrl";

export function* login(user: any) {
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = yield fetch(`${CONSTANTS.DEV_URL}/user/login`, opt);
  const message = yield response.json();
  return yield { status: response.status, data: message };
}
export function* verify(token: any) {
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  };
  const response = yield fetch(`${CONSTANTS.BASE_URL}/user/verify`, opt);
  const message = yield response.json();
  return yield { status: response.status, data: message };
}
export function* resendEmail(email: any) {
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  };
  const response = yield fetch(`${CONSTANTS.DEV_URL}/user/resendVerify`, opt);
  const message = yield response.json();
  return yield { status: response.status, data: message };
}
export function* forgot(token: any) {
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  };
  const response = yield fetch(
    `${CONSTANTS.BASE_URL}/user/forgotPassword`,
    opt
  );
  const message = yield response.json();
  return yield { status: response.status, data: message };
}

export function* reset(token: any) {
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  };
  const response = yield fetch(`${CONSTANTS.BASE_URL}/user/resetPassword`, opt);
  const message = yield response.json();
  return yield { status: response.status, data: message };
}
