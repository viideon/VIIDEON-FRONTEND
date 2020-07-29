import { put, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import { types } from "../../Types/register";
import { toast } from "react-toastify";
import { registerApi } from "./api";
function* registerUser(action: any) {
  try {
    const result = yield registerApi(action.payload);
    if (result.status === 201) {
      yield put({ type: types.REGISTRATION_SUCCESS, payload: result.message });
      yield put(push("/"));
      toast.info("Signup was successfull, Please Verify your email");
    } else {
      yield put({ type: types.REGISTRATION_FAILURE, payload: result.message });
      toast.error("Error, Please try again");
    }
  } catch (error) {
    if (error.response.status === 303) {
      yield put({ type: types.REGISTRATION_FAILURE });
      toast.error("Email address is already registered");
    }
    else {
      yield put({ type: types.REGISTRATION_FAILURE });
      toast.error("Error, Please try again");
    }
  }
}
export function* registerhWatcher() {
  yield takeEvery(types.REGISTRATION_REQUEST, registerUser);
}
