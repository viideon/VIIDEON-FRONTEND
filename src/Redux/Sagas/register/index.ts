import { put, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import { types } from "../../Types/register";
import { toast } from "react-toastify";
import { register } from "./api";
function* registerUser(action: any) {
  try {
    const result = yield register(action.payload);
    if (result.status === 201) {
      yield put({ type: types.REGISTRATION_SUCCESS, payload: result.message });
      yield put(push("/"));
      toast.info("Signup was successfull, Please Verify your email");
    } else {
      yield put({ type: types.REGISTRATION_FAILURE, payload: result.message });
      toast.error("Error , Please try again");
    }
  } catch (error) {
    yield put({ type: types.REGISTRATION_FAILURE, payload: error });
    toast.error("Already registered with this email or user name");
  }
}
export function* registerhWatcher() {
  yield takeEvery(types.REGISTRATION_REQUEST, registerUser);
}
