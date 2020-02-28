import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as constants from "../actions/constants"
import * as authService from '../services/userService';
import * as portfolioService from "../services/portfolioService"



function* signup(action: any) {
  try {
    const res = yield call(authService.signup, action.payload)
    if (res.status === 200) {
      yield put({ type: constants.SIGNUP_SUCCESS });
    } else {
      yield put({ type: constants.SIGNUP_FAILED });
    }
  } catch (error) {
    yield put({ type: constants.SIGNUP_FAILED });

  }
}

function* login(action: any) {

  try {
    const res = yield call(authService.login, action.payload);
    if (res.status === 200 && res.data.ok === true) {
      yield put({ type: constants.LOGIN_SUCCESS, payload: res.data });
    } else {
      yield put({ type: constants.LOGIN_FAILED, payload: "Server error ,try again later" });
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: constants.LOGIN_FAILED, payload: error.response.data.message });
    } else {
      yield put({ type: constants.LOGIN_FAILED, payload: "Server error ,try again later" });
    }

  }
}



function* actionWatcher() {

  yield takeLatest(constants.SIGNUP, signup);
  yield takeLatest(constants.LOGIN, login);
  // yield takeLatest(constants.GET_PORTFOLIOS, getPortfolios);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
