import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { types } from '../../Types/auth';
import { types as profileTypes } from '../../Types/profile';
import { login } from './api';
import { toast } from 'react-toastify';
function* loginUser(action: any) {
    try {
        const result = yield login(action.payload);
        if (result.status === 201) {
            yield put({ type: types.LOGIN_SUCCESS, payload: result.message });
            yield put({ type: profileTypes.ADD_PROFILE_DATA, payload: result.message });
            yield put(push('/'));
        }
        else {
            yield put({ type: types.LOGIN_FAILURE, payload: result.message });
            toast.error("Please try again");
        }
    } catch (error) {
        alert(error);
        yield put({ type: types.LOGIN_FAILURE, payload: error });
        toast.error("Invalid Credentials");
    }
}

function* logout() {
    try {
        yield put({ type: types.LOUGOUT_SUCCESS });
        yield put(push('/'));

    } catch (error) {
        toast.error(error);
    }
}
export function* authWatcher() {
    yield takeEvery(types.LOGIN_REQUEST, loginUser);
    yield takeEvery(types.LOUGOUT, logout);
}
