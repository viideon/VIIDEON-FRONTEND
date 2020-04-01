import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { types } from '../../Types/auth';
import { login } from './api';
function* loginUser(action: any) {
    try {
        const result = yield login(action.payload);
        console.log('result Response', result)
        if (result.status === 201) {
            yield put({ type: types.LOGIN_SUCCESS, payload: result.message });
            yield put(push('/'));
        }
        else {
            yield put({ type: types.LOGIN_FAILURE, payload: result.message });
            // alert(result.message.message.toString());
            alert("please Try Again")
        }
    } catch (error) {
        yield put({ type: types.LOGIN_FAILURE, payload: error });
        console.log(error);
        alert("Invalid Credentials")
    }
}
export function* authWatcher() {
    yield takeEvery(types.LOGIN_REQUEST, loginUser);
}
