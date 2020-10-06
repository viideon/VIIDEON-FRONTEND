import { put, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import { types } from "../../Types/auth";
import { types as profileTypes } from "../../Types/profile";
import {
  verifyApi,
  forgotPasswordApi,
  resetPasswordApi,
  resendVerifyEmailApi,
  loginUserApi
} from "./api";
import { toast } from "react-toastify";
function* loginUser(action: any) {
  try {
    const result = yield loginUserApi(action.payload);
    if (result?.status === 201) {
      yield put({ type: types.LOGIN_SUCCESS, payload: result.data });
      yield put({
        type: profileTypes.ADD_PROFILE_DATA,
        payload: result.data
      });
      yield put(push("/"));
    } else if (result.status === 410) {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: { message: result.data.message, isEmailNotVerified: true }
      });
      toast.error(result.data.message);
    } else {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: { isEmailNotVerified: false }
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error?.response?.status === 410) {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: { isEmailNotVerified: true }
      });
    } else if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.LOGIN_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.LOGIN_FAILURE });
    } else {
      const errorMessage = "There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.LOGIN_FAILURE });
    }
  }
}
function* verifyUser(action: any) {
  try {
    const result = yield verifyApi(action.payload);
    if (result.status === 201) {
      yield put({
        type: types.VERIFY_SUCCESS,
        payload: result.data.message
      });
    } else {
      yield put({
        type: types.VERIFY_FAILURE,
        payload: result.data.message
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.FORGOT_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.FORGOT_FAILURE });
    } else {
      const errorMessage = "There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.FORGOT_FAILURE });
    }
  }
}
function* forgotPassword(action: any) {
  try {
    const result = yield forgotPasswordApi(action.payload);
    if (result.status === 201) {
      toast.success("Reset Password link sent on given email");
      yield put({
        type: types.FORGOT_SUCCESS,
        payload: result.data
      });
      yield put({ type: types.RESET_FORGOT_SUCCESS_VARIABLE });
    } else {
      yield put({
        type: types.FORGOT_FAILURE
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.FORGOT_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.FORGOT_FAILURE });
    } else {
      const errorMessage = "There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.FORGOT_FAILURE });
    }
  }
}
function* resendEmailSagas(action: any) {
  toast.info("Sending verfication link please wait");
  try {
    const result = yield resendVerifyEmailApi(action.payload);
    if (result.status === 201) {
      toast.info("Verification link has been sent");
      yield put({
        type: types.RESEND_EMAIL_SUCCESS
      });
    } else {
      yield put({
        type: types.RESEND_EMAIL_FAILURE
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.RESEND_EMAIL_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.RESEND_EMAIL_FAILURE });
    } else {
      const errorMessage = "There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.RESEND_EMAIL_FAILURE });
    }
  }
}
function* resetPassword(action: any) {
  try {
    const result = yield resetPasswordApi(action.payload);
    if (result.status === 201 || result.status === 200) {
      toast.success("Password changed successfully");
      yield put({
        type: types.RESET_SUCCESS,
        payload: result.data
      });
    } else {
      yield put({
        type: types.RESET_FAILURE
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.RESET_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.RESET_FAILURE });
    } else {
      const errorMessage = "There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.RESET_FAILURE });
    }
  }
}

function* logout() {
  console.log("req");
  try {
    yield put({ type: types.LOGOUT_REQ });
    yield put(push("/"));
  } catch (error) {
    if (error.message) {
      return toast.error(error.message);
    }
    toast("Failed to logout");
  }
}
export function* authWatcher() {
  yield takeEvery(types.LOGIN_REQUEST, loginUser);
  yield takeEvery(types.LOUGOUT, logout);
  yield takeEvery(types.VERIFY_REQUEST, verifyUser);
  yield takeEvery(types.FORGOT_REQUEST, forgotPassword);
  yield takeEvery(types.RESET_REQUEST, resetPassword);
  yield takeEvery(types.RESEND_EMAIL_REQUEST, resendEmailSagas);
}
