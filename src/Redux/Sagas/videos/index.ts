import { put, takeEvery, takeLatest, call, select } from "redux-saga/effects";
import { types } from "../../Types/videos";
import {
  sendVideoToEmail,
  saveVideo,
  updateVideoViews,
  getVideosByUserId,
  videoCount,
  getVideosByTitle,
  updateUserVideo,
  deleteVideoById,
  getSingleVideo,
  sendMultiEmails,
  deleteDataAws,
  updateVideoWatch,
  updateEmailShare,
  getCampaignVideos,
  campaignCount,
  updateCtaVideo,
  getCampaignVideosByTitle,
} from "./api";
import {
  selectID,
  selectVideos,
  getPageNo,
  isLoadMore,
  isEmailConfigPresent,
} from "../../Selectors/index";
import { toast } from "react-toastify";

function* sendVideoOnEmail(action: any) {
  try {
    let isConfig = yield select(isEmailConfigPresent);
    if (!isConfig) {
      yield put({ type: types.VIDEO_SEND_FAILURE });
      toast.info(
        "Please add an email configuration to send email's on your behalf"
      );
      return;
    }
    let userId = yield select(selectID);
    const payload = action.payload;
    payload.userId = userId;

    const result = yield sendVideoToEmail(payload);

    if (result.status === 200) {
      yield put({ type: types.VIDEO_SEND_SUCCESS, payload: result.message });
      toast.info("Email Sent Successfully");
    } else {
      yield put({ type: types.VIDEO_SEND_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.VIDEO_SEND_FAILURE });
    toast.error(error.message);
  }
}

function* saveUserVideo(action: any) {
  try {
    const result = yield saveVideo(action.payload);
    if (result.status === 201) {
      yield put({ type: types.VIDEO_SAVE_SUCESS });
      yield put({
        type: types.GET_SAVED_VIDEO_ID,
        payload: result.data.video._id,
      });
      toast.info("Saved Successfully");
    } else {
      yield put({ type: types.VIDEO_SAVE_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.VIDEO_SAVE_FAILURE, payload: error });
    toast.error(error.message);
  }
}
function* updateView(action: any) {
  try {
    const result = yield updateVideoViews(action.payload);
    if (result.status === 200) {
      yield put({ type: types.UPDATE_VIEW_SUCCESS });
    } else {
      yield put({ type: types.UPDATE_VIEW_FAILURE });

    }
  } catch (error) {
    yield put({ type: types.UPDATE_VIEW_FAILURE, payload: error });
  }
}
function* updateWatch(action: any) {
  try {
    const result = yield updateVideoWatch(action.payload);
    if (result.status === 200) {
      yield put({ type: types.UPDATE_VIDEO_WATCH_SUCCESS });
    } else {
      yield put({ type: types.UPDATE_VIDEO_WATCH_FAILURE });

    }
  } catch (error) {
    yield put({ type: types.UPDATE_VIDEO_WATCH_FAILURE, payload: error });
    toast.error(error.message);
  }
}
function* getCampaignVideoSagas(action: any) {
  try {
    const result = yield getCampaignVideos(action.payload);
    if (result.status === 200) {
      yield put({
        type: types.GET_CAMPAIGN_VIDEOS_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({ type: types.GET_CAMPAIGN_VIDEOS_FAILURE });
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    yield put({ type: types.GET_CAMPAIGN_VIDEOS_FAILURE, payload: error });
    toast.error(error.message);
  }
}
function* updateEmailShareSagas(action: any) {
  try {
    const result = yield updateEmailShare(action.payload);
    if (result.status === 200) {
      yield put({ type: types.UPDATE_EMAIL_SHARE_SUCCESS });
    } else {
      yield put({ type: types.UPDATE_EMAIL_SHARE_FAILURE });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_EMAIL_SHARE_FAILURE, payload: error });
    toast.error(error.message);
  }
}
function* updateVideoCta(action: any) {
  try {
    const result = yield updateCtaVideo(action.payload);
    if (result.status === 200) {
      yield put({ type: types.UPDATE_VIDEO_CTA_SUCCESS });
    } else {
      yield put({ type: types.UPDATE_VIDEO_CTA_FAILURE });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_VIDEO_CTA_FAILURE });

  }
}

function* getUserVideos(action: any) {
  let userId = yield select(selectID);
  let pageNo = yield select(getPageNo);
  const queryObj = {
    userId: userId,
    page: pageNo,
  };
  try {
    var result;
    if (action.payload === "allVideos") {
      result = yield call(getVideosByUserId, queryObj);
    } else {
      result = yield call(getCampaignVideos, queryObj);
    }
    yield put({ type: types.LOADMORE_TRUE });
    if (result.status === 200 && result.data.message.length < 9) {
      yield put({
        type: types.GET_USER_VIDEOS_SUCCESS,
        payload: result.data.message,
      });
      yield put({ type: types.DISABLE_LOADMORE });
    } else if (result.status === 200) {
      yield put({ type: types.LOADMORE_TRUE });
      yield put({
        type: types.GET_USER_VIDEOS_SUCCESS,
        payload: result.data.message,
      });
    } else {
      yield put({
        type: types.GET_USER_VIDEOS_FAILED,
        payload: result.data.message,
      });
    }
  } catch (error) {
    toast.error("Failed to fetch user videos please try again");
    yield put({ type: types.GET_USER_VIDEOS_FAILED, payload: error });
  }
}
function* searchUserVideos(action: any) {
  let userId = yield select(selectID);
  let pageNo = yield select(getPageNo);
  const queryObj = {
    userId: userId,
    page: pageNo,
    title: action.payload.title,
  };
  try {
    let result;
    if (action.payload.videoType === "allVideos") {
      result = yield call(getVideosByTitle, queryObj);
    } else {
      result = yield call(getCampaignVideosByTitle, queryObj);
    }
    yield put({ type: types.DISABLE_LOADMORE });
    if (result.status === 200) {
      yield put({
        type: types.SEARCH_VIDEOS_SUCCESS,
        payload: result.data.message,
      });
    } else {
      yield put({
        type: types.GET_USER_VIDEOS_FAILED,
        payload: result.data.message,
      });
    }
  } catch (error) {
    toast.error("Failed to fetch user videos please try again");
    yield put({ type: types.GET_USER_VIDEOS_FAILED, payload: error });
  }
}
function* updateVideo(action: any) {
  try {
    const result = yield call(updateUserVideo, action.payload);

    if (result.status === 200) {
      const responseVideo = result.data.video;
      yield put({ type: types.UPDATE_VIDEO_SUCCESS, payload: responseVideo });
      toast.info("Updated");
      window.location.reload(true);
    } else {
      toast.error("Update failed, please try again");
      yield put({
        type: types.UPDATE_VIDEO_FAIL,
        payload: result.data.message,
      });
    }
  } catch (error) {
    toast.error("Update failed, please try again");
    yield put({ type: types.UPDATE_VIDEO_FAIL, payload: error });
  }
}

function* getVideo(action: any) {
  try {
    const result = yield call(getSingleVideo, action.payload);
    if (result.status === 200) {
      yield put({ type: types.GET_VIDEO_SUCCESS, payload: result.data.video });
    } else {
      yield put({ type: types.GET_VIDEO_FAILURE });
      toast.info("Not a valid video link");
    }
  } catch (err) {
    yield put({ type: types.GET_VIDEO_FAILURE });
    toast.error(err);
  }
}

function* sendMultipleEmail(action: any) {
  try {
    let isConfig = yield select(isEmailConfigPresent);
    if (!isConfig) {
      yield put({ type: types.MULTIPLE_EMAIL_FAILED });
      toast.info(
        "Please add an email configuration to send email's on your behalf"
      );
      return;
    }
    let userId = yield select(selectID);
    const payload = action.payload;
    payload.userId = userId;

    const result = yield call(sendMultiEmails, payload);
    if (result.status === 200) {
      yield put({ type: types.MULTIPLE_EMAIL_SUCCESS });
      toast.info("Email's sent");
    } else {
      yield put({ type: types.MULTIPLE_EMAIL_FAILED });
      toast.error("Failed to send email's");
    }
  } catch (error) {
    yield put({ type: types.MULTIPLE_EMAIL_FAILED });
    toast.error(error.message);
  }
}

export function* deleteVideo(action: any) {
  let videoId = action.payload;
  let pageNo = yield select(getPageNo);
  let loadNew = yield select(isLoadMore);
  const callObj = {
    videoId: videoId,
    pageNo: pageNo,
  };
  try {
    const result = yield call(deleteVideoById, callObj);

    if (result.status === 200) {
      yield put({ type: types.DELETE_VIDEO_SUCCESS });
      const videos = yield select(selectVideos);
      const updatedVideos = videos.filter(
        (video: any) => video._id !== videoId
      );
      const removedVideo = videos.find((video: any) => video._id === videoId);
      if (result.data.nextVideo && loadNew) {
        updatedVideos.push(result.data.nextVideo);
      }
      deleteDataAws(removedVideo.url);
      yield put({
        type: types.UPDATE_VIDEOS_AFTEREDELETE,
        payload: updatedVideos,
      });
      yield put({ type: types.ENABLE_DELETEDIALOG });
      toast.info("Video deleted");
    } else {
      yield put({ type: types.DELETE_VIDEO_FAILURE });
      yield put({ type: types.ENABLE_DELETEDIALOG });
      toast.error("Failed to delete video");
    }
  } catch (err) {
    yield put({ type: types.DELETE_VIDEO_FAILURE });
    toast.error(err.message);
  }
}

export function* getVideoCount() {
  try {
    const userId = yield select(selectID);
    const result = yield call(videoCount, userId);

    if (result.status === 200) {
      yield put({
        type: types.COUNT_VIDEO_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({ type: types.COUNT_VIDEO_FAIL });
    }
  } catch (error) {
    yield put({ type: types.COUNT_VIDEO_FAIL });
  }
}

export function* getCampaignCount() {
  try {
    const userId = yield select(selectID);
    const result = yield call(campaignCount, userId);
    if (result.status === 200) {
      yield put({
        type: types.COUNT_CAMPAIGN_SUCCESS,
        payload: result.data.count,
      });
    } else {
      yield put({ type: types.COUNT_CAMPAIGN_FAILURE });
    }
  } catch (error) {
    yield put({ type: types.COUNT_CAMPAIGN_FAILURE });
  }
}

export function* videoWatcher() {
  yield takeEvery(types.VIDEO_SEND_REQUEST, sendVideoOnEmail);
  yield takeEvery(types.VIDEO_SAVE, saveUserVideo);
  yield takeEvery(types.GET_USER_VIDEOS, getUserVideos);
  yield takeLatest(types.SEARCH_USER_VIDEOS, searchUserVideos);
  yield takeEvery(types.UPDATE_VIDEO, updateVideo);
  yield takeEvery(types.DELETE_VIDEO, deleteVideo);
  yield takeEvery(types.GET_VIDEO, getVideo);
  yield takeEvery(types.SEND_MULTIPLE_EMAIL, sendMultipleEmail);
  yield takeLatest(types.COUNT_VIDEO, getVideoCount);
  yield takeLatest(types.COUNT_CAMPAIGN, getCampaignCount);
  yield takeEvery(types.UPDATE_VIEW_REQUEST, updateView);
  yield takeEvery(types.UPDATE_VIDEO_WATCH_REQUEST, updateWatch);
  yield takeEvery(types.UPDATE_EMAIL_SHARE_REQUEST, updateEmailShareSagas);
  yield takeEvery(types.GET_CAMPAIGN_VIDEOS_REQUEST, getCampaignVideoSagas);
  yield takeEvery(types.UPDATE_VIDEO_CTA_REQUEST, updateVideoCta);
}
