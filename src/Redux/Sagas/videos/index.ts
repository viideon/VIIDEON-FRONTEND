import { put, takeEvery } from 'redux-saga/effects';
import { types } from '../../Types/videos';
import { video } from './api';
function* userVideo(action: any) {
    try {
        const result = yield video(action.payload);
        console.log('result Response',result)
        if (result.status === 201) {
            yield put({ type: types.VIDEO_SUCCESS, payload: result.message });
            alert("Upload Successfully")
        }
        else {
            yield put({ type: types.VIDEO_FAILURE, payload: result.message });
            // alert(result.message.message.toString());
            alert("Error")
        }
    } catch (error) {
        console.log(error);
    }
}
export function* videoWatcher() {
    yield takeEvery(types.VIDEO_REQUEST, userVideo);
}
