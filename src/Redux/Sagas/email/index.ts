import { put, takeEvery, select } from 'redux-saga/effects';
import { types } from '../../Types/email';
import { saveEmailConfig, getUserConfig } from './api';
import { selectID, } from "../../Selectors/index"
import { toast } from 'react-toastify';

function* saveUserEmailConfig(action: any) {
    let userId = yield select(selectID);
    const configObj = {
        userId: userId,
        code: action.payload
    }
    try {
        const result = yield saveEmailConfig(configObj);
        if (result.status === 201) {
            yield put({ type: types.ADD_EMAIL_CONFIG_SUCCESS, payload: result.userEmail });
        }
        else {
            yield put({ type: types.ADD_EMAIL_CONFIG_FAILURE });
            toast.error("Failed to add your configuration");
        }
    } catch (error) {
        yield put({ type: types.ADD_EMAIL_CONFIG_FAILURE, payload: error });
        toast.error("Failed to add your configuration");
    }
}

function* getUserEmailConfig() {
    let userId = yield select(selectID);
    try {
        const result = yield getUserConfig(userId);
        if (result.status === 200) {
            yield put({ type: types.GET_USER_EMAIL_CONFIG_SUCCESS, payload: result.configurations });
        }
        else {
            yield put({ type: types.ADD_EMAIL_CONFIG_FAILURE });
            toast.error("Failed to get your configuration");
        }

    } catch (error) {
        yield put({ type: types.ADD_EMAIL_CONFIG_FAILURE });
        toast.error("Failed to get your configuration");
    }
}
export function* emailWatcher() {
    yield takeEvery(types.ADD_EMAIL_CONFIGURATION, saveUserEmailConfig);
    yield takeEvery(types.GET_USER_EMAIL_CONFIG, getUserEmailConfig);
}
