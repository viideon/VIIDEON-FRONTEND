import { put, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import { types } from "../../Types/auth";
import { types as profileTypes } from "../../Types/profile";
import { login, verify, forgot, reset, resendEmail } from "./api";
import { toast } from "react-toastify";
function* loginUser(action: any) {
  try {
    const result = yield login(action.payload);
    if (result.status === 201) {
      yield put({ type: types.LOGIN_SUCCESS, payload: result.data });
      yield put({
        type: profileTypes.ADD_PROFILE_DATA,
        payload: result.data,
      });
      yield put(push("/"));
    } else if (result.status === 410) {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: { message: result.data.message, isEmailNotVerified: true },
      });
      toast.error(result.data.message);
    } else {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: { message: result.data.message, isEmailNotVerified: false },
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, payload: error });
    toast.error("Invalid Email or Password");
  }
}
function* VerifyUser(action: any) {
  try {
    const result = yield verify(action.payload);

    if (result.status === 201) {
      yield put({
        type: types.VERIFY_SUCCESS,
        payload: result.data.message,
      });
    } else {
      yield put({
        type: types.VERIFY_FAILURE,
        payload: result.data.message,
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
      yield put({ type: types.VERIFY_FAILURE, payload: error });
    } else {
      toast.error("Server error, Try again");
      yield put({ type: types.VERIFY_FAILURE, payload: error });
    }
  }
}
function* forgotPassword(action: any) {
  try {
    const result = yield forgot(action.payload);

    if (result.status === 201) {
      toast.success("Reset Password link sent on given email");
      yield put({
        type: types.FORGOT_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: types.FORGOT_FAILURE,
        payload: result.data.message,
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
      yield put({ type: types.FORGOT_FAILURE, payload: error });
    } else {
      toast.error("Server error, Try again");
      yield put({ type: types.FORGOT_FAILURE, payload: error });
    }
  }
}
function* resendEmailSagas(action: any) {
  try {
    const result = yield resendEmail(action.payload);

    if (result.status === 201) {
      toast.info("Verification link has been sent");
      yield put({
        type: types.RESEND_EMAIL_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: types.RESEND_EMAIL_FAILURE,
        payload: result.data.message,
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
      yield put({ type: types.RESEND_EMAIL_FAILURE, payload: error });
    } else {
      toast.error("Server error, Try again");
      yield put({ type: types.RESEND_EMAIL_FAILURE, payload: error });
    }
  }
}
function* resetPassword(action: any) {
  try {
    const result = yield reset(action.payload);
    if (result.status === 201 || result.status === 200) {
      toast.success("Password changed successfully");
      yield put({
        type: types.RESET_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: types.RESET_FAILURE,
        payload: result.data.message,
      });
      toast.error(result.data.message);
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
      yield put({ type: types.RESET_FAILURE, payload: error });
    } else {
      toast.error("Server error, Try again");
      yield put({ type: types.RESET_FAILURE, payload: error });
    }
  }
}

function* logout() {
  try {
    yield put({ type: types.LOUGOUT_SUCCESS });
    yield put(push("/"));
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    }
    toast("Failed to logout");
  }
}
export function* authWatcher() {
  yield takeEvery(types.LOGIN_REQUEST, loginUser);
  yield takeEvery(types.LOUGOUT, logout);
  yield takeEvery(types.VERIFY_REQUEST, VerifyUser);
  yield takeEvery(types.FORGOT_REQUEST, forgotPassword);
  yield takeEvery(types.RESET_REQUEST, resetPassword);
  yield takeEvery(types.RESEND_EMAIL_REQUEST, resendEmailSagas);
}
