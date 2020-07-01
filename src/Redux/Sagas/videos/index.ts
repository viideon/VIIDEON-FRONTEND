import { put, takeEvery, takeLatest, call, select } from 'redux-saga/effects';
import { types } from '../../Types/videos';
import { sendVideoToEmail, saveVideo, getVideosByUserId, videoCount, getVideosByTitle, updateUserVideo, deleteVideoById, getSingleVideo, sendMultiEmails, deleteDataAws } from './api';
import { selectID, selectVideos, getPageNo, isLoadMore, isEmailConfigPresent } from "../../Selectors/index"
import { toast } from 'react-toastify';

function* sendVideoOnEmail(action: any) {
    try {
        let isConfig = yield select(isEmailConfigPresent);
        if (!isConfig) {
            return toast.error("Please add an email configuration to send email's on your behalf")
        }
        let userId = yield select(selectID);
        const payload = action.payload;
        payload.userId = userId;
        console.log("payload", payload);
        const result = yield sendVideoToEmail(payload);
        console.log("result", result);
        if (result.status === 200) {
            yield put({ type: types.VIDEO_SEND_SUCCESS, payload: result.message });
            toast.info("Email Sent Successfully");
        }
        else {
            yield put({ type: types.VIDEO_SEND_FAILURE, payload: result.message });
            toast.error("Something Went Wrong");
        }
    } catch (error) {
        yield put({ type: types.VIDEO_SEND_FAILURE, payload: error });
        toast.error(error.message);
    }
}

function* saveUserVideo(action: any) {
    try {
        const result = yield saveVideo(action.payload);
        if (result.status === 201) {
            yield put({ type: types.VIDEO_SAVE_SUCESS });
            yield put({ type: types.GET_SAVED_VIDEO_ID, payload: result.data.video._id });
            toast.info("Video Saved Successfully");
        }
        else {
            yield put({ type: types.VIDEO_SAVE_FAILURE });
            toast.error("Something Went Wrong");
        }
    } catch (error) {
        yield put({ type: types.VIDEO_SAVE_FAILURE, payload: error });
        toast.error(error.message);
    }
}

function* getUserVideos() {
    let userId = yield select(selectID);
    let pageNo = yield select(getPageNo);
    const queryObj = {
        userId: userId,
        page: pageNo
    }
    try {
        const result = yield call(getVideosByUserId, queryObj);
        yield put({ type: "LOADMORE_TRUE" });
        if (result.status === 200 && result.data.message.length < 9) {
            yield put({ type: types.GET_USER_VIDEOS_SUCCESS, payload: result.data.message });
            yield put({ type: types.DISABLE_LOADMORE });
        } else if (result.status === 200) {
            yield put({ type: "LOADMORE_TRUE" });
            yield put({ type: types.GET_USER_VIDEOS_SUCCESS, payload: result.data.message })
        }
        else {
            yield put({ type: types.GET_USER_VIDEOS_FAILED, payload: result.data.message })
        }
    }
    catch (error) {
        toast.error("Failed to fetch user videos please try again");
        yield put({ type: types.GET_USER_VIDEOS_FAILED, payload: error })
    }
}
function* searchUserVideos(action: any) {

    let userId = yield select(selectID);
    let pageNo = yield select(getPageNo);
    const queryObj = {
        userId: userId,
        page: pageNo,
        title: action.payload
    }
    try {
        const result = yield call(getVideosByTitle, queryObj);
        yield put({ type: types.DISABLE_LOADMORE });
        if (result.status === 200) {
            yield put({ type: types.SEARCH_VIDEOS_SUCCESS, payload: result.data.message });
        }
        else {
            yield put({ type: types.GET_USER_VIDEOS_FAILED, payload: result.data.message })
        }
    }
    catch (error) {
        toast.error("Failed to fetch user videos please try again");
        yield put({ type: types.GET_USER_VIDEOS_FAILED, payload: error })
    }
}
function* updateVideo(action: any) {
    try {
        const result = yield call(updateUserVideo, action.payload);

        if (result.status === 200) {
            // const videos = yield select(selectVideos);
            const responseVideo = result.data.video;
            // const updatedVideos = videos.map((video: any) => ((video._id === responseVideo._id ? responseVideo : video)));
            yield put({ type: types.UPDATE_VIDEO_SUCCESS, payload: responseVideo })
            toast.success("Updated");
        }
        else {
            toast.error("Update failed, please try again");
            yield put({ type: types.UPDATE_VIDEO_FAIL, payload: result.data.message })
        }
    }
    catch (error) {
        toast.error("Update failed, please try again");
        yield put({ type: types.UPDATE_VIDEO_FAIL, payload: error })
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
    }
    catch (err) {
        yield put({ type: types.GET_VIDEO_FAILURE });
        toast.error(err);
    }
}

function* sendMultipleEmail(action: any) {
    try {
        let isConfig = yield select(isEmailConfigPresent);
        if (!isConfig) {
            return toast.error("Please add an email configuration to send email's on your behalf")
        }
        let userId = yield select(selectID);
        const payload = action.payload;
        payload.userId = userId;
        const result = yield call(sendMultiEmails, payload);
        if (result.status === 200) {
            yield put({ type: types.MULTIPLE_EMAIL_SUCCESS });
            toast.info("Email's sent");
        }
        else {
            yield put({ type: types.MULTIPLE_EMAIL_FAILED });
            toast.error("Failed to send email's");
        }
    }
    catch (error) {
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
        pageNo: pageNo
    }
    try {
        const result = yield call(deleteVideoById, callObj);

        if (result.status === 200) {
            yield put({ type: types.DELETE_VIDEO_SUCCESS });
            const videos = yield select(selectVideos);
            const updatedVideos = videos.filter((video: any) => video._id !== videoId);
            const removedVideo = videos.find((video: any) => video._id === videoId);
            if (result.data.nextVideo && loadNew) {
                updatedVideos.push(result.data.nextVideo);
            }
            deleteDataAws(removedVideo.url);
            if (removedVideo.thumbnail) {
                deleteDataAws(removedVideo.thumbnail);
            }
            yield put({ type: types.UPDATE_VIDEOS_AFTEREDELETE, payload: updatedVideos });
            yield put({ type: "ENABLE_DELETEDIALOG" });
            toast.info("Video deleted");
        } else {
            yield put({ type: types.DELETE_VIDEO_FAILURE });
            yield put({ type: "ENABLE_DELETEDIALOG" });
            toast.error("Failed to delete video");
        }
    }
    catch (err) {
        yield put({ type: types.DELETE_VIDEO_FAILURE });
        toast.error(err.message);
    }
}

export function* getVideoCount() {
    try {
        const userId = yield select(selectID);
        const result = yield call(videoCount, userId);
        if (result.status === 200) {
            yield put({ type: types.COUNT_VIDEO_SUCCESS, payload: result.data.count });
        } else {
            yield put({ type: types.COUNT_VIDEO_FAIL });
        }

    }
    catch (error) {
        toast.error("Failed to connect ,refresh");
        yield put({ type: types.COUNT_VIDEO_FAIL });
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
    yield takeEvery(types.COUNT_VIDEO, getVideoCount);
}
