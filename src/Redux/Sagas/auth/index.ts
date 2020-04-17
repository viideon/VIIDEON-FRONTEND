import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { types } from '../../Types/auth';
import { login } from './api';
import { toast } from 'react-toastify';
function* loginUser(action: any) {
    try {
        const result = yield login(action.payload);
        if (result.status === 201) {
            yield put({ type: types.LOGIN_SUCCESS, payload: result.message });
            yield put(push('/'));
        }
        else {
            yield put({ type: types.LOGIN_FAILURE, payload: result.message });
            toast.error("Please try again");
        }
    } catch (error) {
        yield put({ type: types.LOGIN_FAILURE, payload: error });
        toast.error("Invalid Credentials");
    }
}
export function* authWatcher() {
    yield takeEvery(types.LOGIN_REQUEST, loginUser);
}
