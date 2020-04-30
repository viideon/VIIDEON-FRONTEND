import { put, takeEvery, call, select } from 'redux-saga/effects';
import { types } from '../../Types/videos';
import { sendVideoToEmail, saveVideo, getVideosByUserId, updateUserVideo, getSingleVideo, sendMultiEmails } from './api';
import { selectID, selectVideos } from "../../Selectors/index"
import { toast } from 'react-toastify';

function* sendVideoOnEmail(action: any) {
    try {
        const result = yield sendVideoToEmail(action.payload);
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

    try {
        const result = yield call(getVideosByUserId, userId);
        if (result.status === 200) {
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
function* updateVideo(action: any) {
    try {
        const result = yield call(updateUserVideo, action.payload);

        if (result.status === 200) {
            const videos = yield select(selectVideos);
            const responseVideo = result.data.video;
            const updatedVideos = videos.map((video: any) => ((video._id === responseVideo._id ? responseVideo : video)));
            yield put({ type: types.UPDATE_VIDEO_SUCCESS, payload: updatedVideos })
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
        const result = yield call(sendMultiEmails, action.payload);
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

export function* videoWatcher() {
    yield takeEvery(types.VIDEO_SEND_REQUEST, sendVideoOnEmail);
    yield takeEvery(types.VIDEO_SAVE, saveUserVideo);
    yield takeEvery(types.GET_USER_VIDEOS, getUserVideos);
    yield takeEvery(types.UPDATE_VIDEO, updateVideo);
    yield takeEvery(types.GET_VIDEO, getVideo);
    yield takeEvery(types.SEND_MULTIPLE_EMAIL, sendMultipleEmail);
}
