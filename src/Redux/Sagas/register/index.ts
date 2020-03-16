import { put, takeEvery } from 'redux-saga/effects';
import { types } from '../../Types/register';
import { register } from './api';
function* registerUser(action: any) {
    try {
        const result = yield register(action.payload);
        console.log('result Response',result)
        if (result.status === 201) {
            console.log("result", result)
            yield put({ type: types.REGISTRATION_SUCCESS, payload: result.message });
            alert("SignUp Successfully")
        }
        else {
            yield put({ type: types.REGISTRATION_FAILURE, payload: result.message });
            // Alert.alert(result.message.message.toString());
            alert("Error")
        }
    } catch (error) {
        console.log(error);
    }
}
export function* registerhWatcher() {
    yield takeEvery(types.REGISTRATION_REQUEST, registerUser);
}
