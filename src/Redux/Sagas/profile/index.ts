import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { types } from '../../Types/profile';
import { profile } from './api';

function* profileUser(action: any) {
    try {
        const result = yield profile(action.payload);
        if (result.status === 201) {
            yield put({ type: types.PROFILE_SUCCESS, payload: result.message });
            toast.info("Update Profile Successfully");
        }
        else {
            yield put({ type: types.PROFILE_FAILURE, payload: result.message });
            toast.error("Errror updating");
        }
    } catch (error) {
        toast.error(error);
    }
}
export function* profileWatcher() {
    yield takeLatest(types.PROFILE_REQUEST, profileUser);
}
