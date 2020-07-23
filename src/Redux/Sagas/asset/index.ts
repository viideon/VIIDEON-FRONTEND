import { put, takeEvery, select, } from 'redux-saga/effects';
import { types } from '../../Types/asset';
import { addAssetApi, getAssetApi, deleteAssetApi } from './api';
import { selectID, selectAssets } from "../../Selectors/index"
import { toast } from 'react-toastify';

function* addUserAsset(action: any) {
    let userId = yield select(selectID);
    const queryObj = {
        userId: userId,
        asset: action.payload
    }
    try {
        const result = yield addAssetApi(queryObj);
        if (result.status === 201) {
            yield put({ type: types.ADD_ASSET_SUCCESS });
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
        if (result.status === 200) {
            yield put({ type: types.GET_ASSETS_SUCCESS, payload: result.data.assets });
        }
        else {
            yield put({ type: types.GET_ASSETS_FAILURE });
        }
    } catch (error) {
        yield put({ type: types.GET_ASSETS_FAILURE });
    }
}
function* deleteUserAsset(action: any) {
    let userId = yield select(selectID);
    const assetId = action.payload;
    const queryObj = {
        userId,
        assetId
    }
    try {
        const result = yield deleteAssetApi(queryObj);
        if (result.status === 200) {
            const assets = yield select(selectAssets);
            const updatedAssets = assets.filter(
                (asset: any) => asset._id !== assetId
            );
            yield put({ type: types.DELETE_ASSET_SUCCESS, payload: updatedAssets });
            toast.info("Asset deleted");
        } else {
            yield put({ type: types.DELETE_ASSET_FAILURE });
            toast.info("Failed to delete asset");
        }
    }
    catch (error) {
        yield put({ type: types.DELETE_ASSET_FAILURE });
        toast.info("Failed to delete asset");
    }
}
export function* assetWatcher() {
    yield takeEvery(types.ADD_ASSET, addUserAsset);
    yield takeEvery(types.GET_ASSETS, getUserAsset);
    yield takeEvery(types.DELETE_ASSET, deleteUserAsset);
}