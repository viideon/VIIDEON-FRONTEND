import { put, takeEvery, select, } from 'redux-saga/effects';
import { types } from '../../Types/asset';
import { addAssetApi, getAssetApi } from './api';
import { selectID } from "../../Selectors/index"
import { toast } from 'react-toastify';

function* addUserAsset(action: any) {
    let userId = yield select(selectID);
    const configObj = {
        userId: userId,
        asset: action.payload
    }
    try {
        const result = yield addAssetApi(configObj);
        if (result.status === 201) {
            yield put({ type: types.ADD_ASSET_SUCCESS });
            console.log("success");
        }
        else {
            toast.error("Failed to add your configuration try again");
        }
    } catch (error) {
        console.log("error", error);
    }
}

function* getUserAsset() {
    let userId = yield select(selectID);
    try {
        const result = yield getAssetApi(userId);
        console.log("result", result);
        if (result.status === 200) {
            yield put({ type: types.GET_ASSETS_SUCCESS, payload: result.data.assets });
        }
        else {
            yield put({ type: types.GET_ASSETS_FAILURE });
            toast.error("Failed to get your assets");
        }
    } catch (error) {
        console.log("error", error);
        yield put({ type: types.GET_ASSETS_FAILURE });
        toast.error("Failed to get your assets");
    }
}

export function* assetWatcher() {
    yield takeEvery(types.ADD_ASSET, addUserAsset);
    yield takeEvery(types.GET_ASSETS, getUserAsset);

}