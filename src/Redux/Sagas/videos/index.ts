import { put, takeEvery, call, select } from 'redux-saga/effects';
import { types } from '../../Types/videos';
import { sendVideoToEmail, saveVideo, getVideosByUserId, updateUserVideo } from './api';
import { selectID, selectVideos } from "../../Selectors/index"

function* sendVideoOnEmail(action: any) {
    try {
        const result = yield sendVideoToEmail(action.payload);
        if (result.status === 200) {
            yield put({ type: types.VIDEO_SEND_SUCCESS, payload: result.message });
            alert("Email Sent Successfully")
        }
        else {
            yield put({ type: types.VIDEO_SEND_FAILURE, payload: result.message });
            alert("Something Went Wrong")
        }
    } catch (error) {
        yield put({ type: types.VIDEO_SEND_FAILURE, payload: error });
        alert(error);
    }
}

function* saveUserVideo(action: any) {
    try {
        const result = yield saveVideo(action.payload);
        if (result.status === 201) {
            yield put({ type: types.VIDEO_SAVE_SUCESS });
            alert("Video Saved Successfully")
        }
        else {
            yield put({ type: types.VIDEO_SAVE_FAILURE });
            alert("Something Went Wrong")
        }
    } catch (error) {
        yield put({ type: types.VIDEO_SAVE_FAILURE, payload: error });
        alert(error);
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
        }
        else {
            yield put({ type: types.UPDATE_VIDEO_FAIL, payload: result.data.message })
        }
    }
    catch (error) {
        yield put({ type: types.UPDATE_VIDEO_FAIL, payload: error })
    }
}

export function* videoWatcher() {
    yield takeEvery(types.VIDEO_SEND_REQUEST, sendVideoOnEmail);
    yield takeEvery(types.VIDEO_SAVE, saveUserVideo);
    yield takeEvery(types.GET_USER_VIDEOS, getUserVideos);
    yield takeEvery(types.UPDATE_VIDEO, updateVideo);
}
