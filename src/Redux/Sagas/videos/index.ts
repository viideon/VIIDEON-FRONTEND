import { put, takeEvery, call, select } from 'redux-saga/effects';
import { types } from '../../Types/videos';
import { video, getVideosByUserId, updateUserVideo } from './api';
import { selectID } from "../../Selectors/index"
function* userVideo(action: any) {
    try {
        const result = yield video(action.payload);
        console.log('result Response', result)
        console.log('res===', result.status)
        if (result.status === 200) {
            yield put({ type: types.VIDEO_SUCCESS, payload: result.message });
            alert("Email Sent Successfully")
        }
        else {
            yield put({ type: types.VIDEO_FAILURE, payload: result.message });
            alert("Something Went Wrong")

        }
    } catch (error) {
        yield put({ type: types.VIDEO_FAILURE, payload: error });
        console.log(error)
        alert("Something Went Wrong")
        console.log(error);
    }
}

function* saveVideo(action: any) {
    try {
        const result = yield video(action.payload);
        console.log('result Response', result)
        console.log('res===', result.status)
        if (result.status === 201) {
            yield put({ type: types.VIDEO_SAVE_SUCESS });
            alert("Video Saved Successfully")
        }
        else {
            yield put({ type: types.VIDEO_SAVE_FAILURE });
            alert("Something Went Wrong")
        }
    } catch (error) {
        yield put({ type: types.VIDEO_FAILURE, payload: error });

        alert("Something Went Wrong")

    }
}

function* getUserVideos() {
    let userId = yield select(selectID);

    try {
        const result = yield call(getVideosByUserId, userId);
        if (result.status === 200) {
            console.log("user result", result);
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
            yield put({ type: types.UPDATE_VIDEO_SUCCESS, payload: result.data.message })
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
    yield takeEvery(types.VIDEO_REQUEST, userVideo);
    yield takeEvery(types.VIDEO_SAVE, saveVideo);
    yield takeEvery(types.GET_USER_VIDEOS, getUserVideos);
    yield takeEvery(types.UPDATE_VIDEO, updateVideo);
}
