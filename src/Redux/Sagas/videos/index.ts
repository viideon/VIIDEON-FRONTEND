import { put, takeEvery } from 'redux-saga/effects';
import { types } from '../../Types/videos';
import { video } from './api';
function* userVideo(action: any) {
    try {
        const result = yield video(action.payload);
        console.log('result Response', result)
        console.log('res===', result.status)
        if (result.status === 200) {
            yield put({ type: types.VIDEO_SUCCESS, payload: result.message });
            alert("Upload Successfully")
        }
        else {
            yield put({ type: types.VIDEO_FAILURE, payload: result.message });
            // alert(result.message.message.toString());
            alert("Something Went Wrong")

        }
    } catch (error) {
        yield put({ type: types.VIDEO_FAILURE, payload: error });
        console.log(error)
        alert("Something Went Wrong")
        console.log(error);
    }
}
export function* videoWatcher() {
    yield takeEvery(types.VIDEO_REQUEST, userVideo);
}
