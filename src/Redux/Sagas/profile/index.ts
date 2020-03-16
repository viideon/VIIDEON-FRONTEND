import {put, takeLatest} from 'redux-saga/effects';
import { types } from '../../Types/profile';
import { profile } from './api';

function* profileUser(action: any) {
    try {
        const result = yield profile(action.payload);
        console.log('result Response',result)
        if (result.status === 201) {
            console.log("result", result)
            yield put({ type: types.PROFILE_SUCCESS, payload: result.message });
            alert("Update Profile Successfully")
        }
        else {
            yield put({ type: types.PROFILE_FAILURE, payload: result.message });
            alert("Error")
        }
    } catch (error) {
        console.log(error);
    }
}
export function* profileWatcher() {
    yield takeLatest(types.PROFILE_REQUEST, profileUser);
}
