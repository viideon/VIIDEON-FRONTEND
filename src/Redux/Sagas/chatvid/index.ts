import { put, takeEvery, takeLatest, call, select } from "redux-saga/effects";
import { types } from "../../Types/chatvid";
import {
  getChatvids,
  getChatvid,
  saveChatVid,
  replyToAChatvid,
  deleteDataAws,
} from "./api";
import {
  selectID,
} from "../../Selectors/index";
import { toast } from "react-toastify";

function* getChatVidsSaga(action: any) {
  try {
    let userId = yield select(selectID);
    const result = yield getChatvids(userId);
    console.log('result', result)
    if (result.status === 200) {
      yield put({ type: types.GET_CHATVIDS_SUCCESS, payload: result.data.message });
    } else {
      yield put({ type: types.GET_CHATVIDS_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.GET_CHATVIDS_FAILURE });
    toast.error(error.message);
  }
}
function* getChatVidSaga(action: any) {
  try {
    const result = yield getChatvid(action.payload);
    console.log('result', result)
    if (result.status === 200) {
      yield put({ type: types.GET_CHATVID_SUCCESS, payload: result.data.message[0] });
    } else {
      yield put({ type: types.GET_CHATVID_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.GET_CHATVID_FAILURE });
    toast.error(error.message);
  }
}

function* saveChatVidSaga(action: any) {
  try {
    let userId = yield select(selectID);
    const payload = action.payload;
    payload.userId = userId;
    const result = yield saveChatVid(payload);
    if (result.status === 200) {
      yield put({ type: types.SAVE_CHATVID_SUCCESS });
      yield put({ type: types.GET_CHATVIDS_REQUEST });
      toast.info("Chatvid saved successfully!");
    } else {
      yield put({ type: types.SAVE_CHATVID_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.SAVE_CHATVID_FAILURE });
    toast.error(error.message);
  }
}

function* replyToAChatvidSaga(action: any) {
  try {
    const payload = action.payload;
    const result = yield replyToAChatvid(payload);
    if (result.status === 200) {
      yield put({ type: types.REPLY_TO_CHATVID_SUCCESS });
      toast.info("Replied Successfully!");
    } else {
      yield put({ type: types.REPLY_TO_CHATVID_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.REPLY_TO_CHATVID_FAILURE });
    toast.error(error.message);
  }
}


export function* chatVidWatcher() {
  yield takeEvery(types.GET_CHATVIDS_REQUEST, getChatVidsSaga);
  yield takeEvery(types.GET_CHATVID_REQUEST, getChatVidSaga);
  yield takeEvery(types.SAVE_CHATVID_REQUEST, saveChatVidSaga);
  yield takeEvery(types.REPLY_TO_CHATVID_REQUEST, replyToAChatvidSaga);
}
