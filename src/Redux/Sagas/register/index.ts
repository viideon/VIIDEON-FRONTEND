import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { types } from '../../Types/register';
import { register } from './api';
function* registerUser(action: any) {
    try {
        const result = yield register(action.payload);

        if (result.status === 201) {

            yield put({ type: types.REGISTRATION_SUCCESS, payload: result.message });
            yield put(push('/'));
            alert("SignUp Successfully")
        }
        else {
            yield put({ type: types.REGISTRATION_FAILURE, payload: result.message });

            alert("Try Again")
        }
    } catch (error) {
        yield put({ type: types.REGISTRATION_FAILURE, payload: error });

        alert("Already Registered with this Email or UserName")

    }
}
export function* registerhWatcher() {
    yield takeEvery(types.REGISTRATION_REQUEST, registerUser);
}
