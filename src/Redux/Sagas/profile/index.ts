import { put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { types } from "../../Types/profile";
import { updateProfileApi } from "./api";

function* updateProfileUser(action: any) {
  try {
    const result = yield updateProfileApi(action.payload);
    if (result.status === 201) {
      yield put({
        type: types.PROFILE_UPDATE_SUCCESS,
        payload: result.data.user
      });
      toast.info("Update Profile Successfully");
    } else {
      yield put({ type: types.PROFILE_UPDATE_FAILURE });
      toast.error("Error updating");
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.PROFILE_UPDATE_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.PROFILE_UPDATE_FAILURE });
    } else {
      const errorMessage = "There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.PROFILE_UPDATE_FAILURE });
    }
  }
}
export function* profileWatcher() {
  yield takeLatest(types.PROFILE_UPDATE_REQUEST, updateProfileUser);
}
