import { put, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import { types } from "../../Types/auth";
import { types as profileTypes } from "../../Types/profile";
import { login, verify, forgot, reset } from "./api";
import { toast } from "react-toastify";
function* loginUser(action: any) {
  try {
    const result = yield login(action.payload);
    if (result.status === 201) {
      yield put({ type: types.LOGIN_SUCCESS, payload: result.message });
      yield put({
        type: profileTypes.ADD_PROFILE_DATA,
        payload: result.message,
      });
      yield put(push("/"));
    } else {
      yield put({ type: types.LOGIN_FAILURE, payload: result.message });
      toast.error("Please try again");
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, payload: error });
    toast.error("Invalid Email or Password");
  }
}
function* VerifyUser(action: any) {
  console.log("verify");
  try {
    const result = yield verify(action.payload);
    console.log(result);
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
    console.log("errrrrr", error);
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
  console.log("forgot");
  try {
    const result = yield forgot(action.payload);
    console.log(result);
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
    console.log("errrrrr", error);
    if (error.message) {
      toast.error(error.message);
      yield put({ type: types.FORGOT_FAILURE, payload: error });
    } else {
      toast.error("Server error, Try again");
      yield put({ type: types.FORGOT_FAILURE, payload: error });
    }
  }
}
function* resetPassword(action: any) {
  console.log("reset");
  try {
    const result = yield reset(action.payload);
    console.log(result);
    if (result.status === 201 || result.status === 200) {
      toast.success("Password reset completed");
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
    console.log("errrrrr", error);
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
    toast.error(error);
  }
}
export function* authWatcher() {
  yield takeEvery(types.LOGIN_REQUEST, loginUser);
  yield takeEvery(types.LOUGOUT, logout);
  yield takeEvery(types.VERIFY_REQUEST, VerifyUser);
  yield takeEvery(types.FORGOT_REQUEST, forgotPassword);
  yield takeEvery(types.RESET_REQUEST, resetPassword);
}
