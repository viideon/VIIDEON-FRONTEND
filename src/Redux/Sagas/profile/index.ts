import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { types } from '../../Types/profile';
// import { types as userTypes } from "../../Types/auth"
import { updateProfile } from './api';

function* updateProfileUser(action: any) {
    try {
        const result = yield updateProfile(action.payload);
        if (result.status === 201) {
            yield put({ type: types.PROFILE_UPDATE_SUCCESS, payload: result });
            // yield put({ type: userTypes.UPDATE_USER, payload: result.user })
            toast.info("Update Profile Successfully");
        }
        else {
            yield put({ type: types.PROFILE_UPDATE_FAILURE, payload: result.message });
            toast.error("Errror updating");
        }
    } catch (error) {
        toast.error(error);
    }
}
export function* profileWatcher() {
    yield takeLatest(types.PROFILE_UPDATE_REQUEST, updateProfileUser);
}
