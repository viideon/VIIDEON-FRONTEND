import { put, takeEvery, select, call } from "redux-saga/effects";
import { types } from "../../Types/email";
import { saveEmailConfig, getUserConfig, deleteConfig } from "./api";
import { selectID, selectEmailConfigs } from "../../Selectors";
import { toast } from "react-toastify";

function* saveUserEmailConfig(action: any) {
  let userId = yield select(selectID);
  const configObj = {
    userId: userId,
    code: action.payload
  };
  try {
    const result = yield saveEmailConfig(configObj);
    yield put({
      type: types.ADD_EMAIL_CONFIG_SUCCESS,
      payload: result.emailConfig
    });
    toast.info("Configuration added");
  } catch (error) {
    if (error.message) {
      yield put({ type: types.ADD_EMAIL_CONFIG_FAILURE });
      toast.error(error.message);
    }
    yield put({ type: types.ADD_EMAIL_CONFIG_FAILURE });
    toast.error("Failed to add your configuration");
  }
}

function* getUserEmailConfig() {
  try {
    const result = yield getUserConfig();
    yield put({
      type: types.GET_USER_EMAIL_CONFIG_SUCCESS,
      payload: result.configurations
    });
  } catch (error) {
    console.log('getUserEmailConfig error', error);
    console.error(error);
    yield put({ type: types.GET_USER_EMAIL_CONFIG_FAILURE });
  }
}
function* deleteUserEmailConfig(action: any) {
  try {
    let configId = action.payload;
    yield call(deleteConfig, configId);
    const emailConfigs = yield select(selectEmailConfigs);
    const updatedConfigs = emailConfigs.filter(
      (config: any) => config._id !== configId
    );
    yield put({
      type: types.DELETE_USER_CONFIG_SUCCESS,
      payload: updatedConfigs
    });
    yield put({ type: types.ENABLE_DELETE_DIALOG });
    toast.info("Email Config deleted successfully");
  } catch (error) {
    if (error.message) {
      yield put({ type: types.DELETE_USER_CONFIG_FAILURE });
      toast.info(error.message);
    } else {
      yield put({ type: types.DELETE_USER_CONFIG_FAILURE });
      toast.info("Failed to delete try again");
    }
  }
}
export function* emailWatcher() {
  yield takeEvery(types.ADD_EMAIL_CONFIGURATION, saveUserEmailConfig);
  yield takeEvery(types.GET_USER_EMAIL_CONFIG, getUserEmailConfig);
  yield takeEvery(types.DELETE_USER_CONFIG, deleteUserEmailConfig);
}
