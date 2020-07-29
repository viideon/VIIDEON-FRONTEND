import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { types } from '../../Types/profile';
import { updateProfile } from './api';

function* updateProfileUser(action: any) {
    try {
        const result = yield updateProfile(action.payload);
        if (result.status === 201) {
            yield put({ type: types.PROFILE_UPDATE_SUCCESS, payload: result });
            toast.info("Update Profile Successfully");
        }
        else {
            yield put({ type: types.PROFILE_UPDATE_FAILURE });
            toast.error("Error updating");
        }
    } catch (error) {
        yield put({ type: types.PROFILE_UPDATE_FAILURE });
        toast.error("Error updating");
    }
}
export function* profileWatcher() {
    yield takeLatest(types.PROFILE_UPDATE_REQUEST, updateProfileUser);
}
