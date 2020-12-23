import { put, takeEvery, select,takeLatest } from "redux-saga/effects";
import { types } from "../../Types/chatvid";
import { push } from 'react-router-redux';
import {
  getChatvids,
  getChatvid,
  saveChatVid,
  replyToAChatvid,
  addStepToChatvid,
  saveMetrics,
  getMetrics,
  chatVidDelete,
  updateStepJump,
  emailVideoSend,
} from "./api";
import {
  selectID,
} from "../../Selectors/index";
import { toast } from "react-toastify";

function* getChatVidsSaga(action: any) {
  try {
    let userId = yield select(selectID);
    const result = yield getChatvids(userId);
    if (result.status === 200) {
      let chatvidsorted :any = result.data.message.sort((a:any,b:any)=>{
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
console.log("saga",chatvidsorted)
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
      yield put(push("/chatvids"));
      action.history.push("/chatvids")
    } else {
      yield put({ type: types.SAVE_CHATVID_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.SAVE_CHATVID_FAILURE });
    toast.error(error.message);
  }
}

function* addChatvidStep(action: any) {
  try {
    let userId = yield select(selectID);
    const payload = action.payload;
    payload.userId = userId;
    const result = yield addStepToChatvid(payload);
    if (result.status === 200) {
      yield put({ type: types.ADD_STEP_TO_CHATVID_SUCCESS });
    //  yield put({ type: types.GET_CHATVIDS_REQUEST })
      toast.info("Added Successfully!");
      action.history.push("/chatvids");
    } else {
      yield put({ type: types.ADD_STEP_TO_CHATVID_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    console.log("error is", error.message)
    yield put({ type: types.ADD_STEP_TO_CHATVID_FAILURE });
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

function* updateJumpSaga(action: any) {
  try {
    const payload = action.payload;
    const result = yield updateStepJump(payload);
    if (result.status === 200) {
      toast.info("Updated!")
    } else {
      toast.warn("something went wrong!")
    }
  } catch (error) {
    toast.warn("something went wrong!")
  }
}

function* saveMetricsSaga(action: any) {
  try {
    const payload = action.payload;
    const result = yield saveMetrics(payload);
    if (result.status === 200) {
      yield put({ type: types.SAVE_ANALYTICS_CHATVID_SUCCESS });
    } else {
      yield put({ type: types.SAVE_ANALYTICS_CHATVID_FAILURE });
    }
  } catch (error) {
    yield put({ type: types.SAVE_ANALYTICS_CHATVID_FAILURE });
  }
}

function* getMetricsData(action: any) {
  console.log("getAnalytics in saga")
  try {
    const payload = action.payload;
    const result = yield getMetrics(payload);
    if (result.status === 200) {
      return yield put({ type: types.GET_ANALYTICS_CHATVID_SUCCESS, payload: result.data.stats });
    }
  } catch (error) {
    yield put({ type: types.GET_ANALYTICS_CHATVID_FAILURE });
  }
}

function* deleteChatVid(action: any) {
  try {
    const payload = action.payload;
    const result = yield chatVidDelete(payload);
    if (result.status === 200) {
      toast.success(result.data?.message || "Succesful.");
      action.history.push("/chatvids")
      return yield put({ type: types.DELETE_CHATVID_SUCCESS });
    }
  } catch (error) {
    yield put({ type: types.DELETE_CHATVID_FAILURE });
    toast.error(error.message || "There is some error.");
  }
}

function* emailVideo(action: any) {
  try {
    const payload = action.payload;
    // payload.userId = userId;
    console.log(payload)
    const result = yield emailVideoSend(payload);
    if (result.status === 200) {
      // yield put({ type: types.ADD_STEP_TO_CHATVID_SUCCESS });
      toast.success("Successfully");

    } else {
      // yield put({ type: types.ADD_STEP_TO_CHATVID_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    // console.log("error is", error.message)
    yield put({ type: types.ADD_STEP_TO_CHATVID_FAILURE });
    // toast.error(error.message);
  }
}
export function* chatVidWatcher() {
  yield takeEvery(types.GET_CHATVIDS_REQUEST, getChatVidsSaga);
  yield takeEvery(types.GET_CHATVID_REQUEST, getChatVidSaga);
  yield takeLatest(types.SAVE_CHATVID_REQUEST, saveChatVidSaga);
  yield takeEvery(types.REPLY_TO_CHATVID_REQUEST, replyToAChatvidSaga);
  yield takeEvery(types.ADD_STEP_TO_CHATVID_REQUEST, addChatvidStep);
  yield takeEvery(types.UPDATE_CHATVID_JUMP, updateJumpSaga);
  yield takeEvery(types.SAVE_ANALYTICS_CHATVID_REQUEST, saveMetricsSaga);
  yield takeEvery(types.GET_ANALYTICS_CHATVID_REQUEST, getMetricsData);
  yield takeEvery(types.DELETE_CHATVID_REQUEST, deleteChatVid);
  yield takeEvery(types.EMAIL_VIDEO, emailVideo);
}
