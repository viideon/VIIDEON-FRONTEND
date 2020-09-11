import { put, takeEvery, select, } from 'redux-saga/effects';
import { types } from '../../Types/asset';
import { addAssetApi, getAssetApi, deleteAssetApi, addMusicApi, getMusicApi, deleteMusicApi, getTemplatesApi } from './api';
import { selectID, selectAssets, selectMusicAssets, } from "../../Selectors/index"
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
            toast.error("Failed to add your asset try again");
        }
    } catch (error) {
        toast.error("Failed to add your asset try again");
    }
}

function* addMusicAsset(action: any) {
    let userId = yield select(selectID);
    const queryObj = {
        userId: userId,
        asset: action.payload
    }
    try {
        const result = yield addMusicApi(queryObj);
        if (result.status === 201) {
            yield put({ type: types.ADD_MUSIC_SUCCESS });
        }
        else {
            toast.error("Failed to add your asset try again");
        }
    } catch (error) {
        toast.error("Failed to add your asset try again");
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
        if (error.response) {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            yield put({ type: types.GET_ASSETS_FAILURE });
        } else if (error.request) {
            const errorMessage = "Error. Please check your internet connection.";
            toast.error(errorMessage);
            yield put({ type: types.GET_ASSETS_FAILURE });
        } else {
            const errorMessage = "Failed to fetch user assets, There was some error.";
            toast.error(errorMessage);
            yield put({ type: types.GET_ASSETS_FAILURE });
        }
    }
}
function* getMusicAsset() {
    let userId = yield select(selectID);
    try {
        const result = yield getMusicApi(userId);
        if (result.status === 200) {
            yield put({ type: types.GET_MUSIC_SUCCESS, payload: result.data.musicAssets });
        }
        else {
            yield put({ type: types.GET_MUSIC_FAILURE });
        }
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            yield put({ type: types.GET_MUSIC_FAILURE });
        } else if (error.request) {
            const errorMessage = "Error. Please check your internet connection.";
            toast.error(errorMessage);
            yield put({ type: types.GET_MUSIC_FAILURE });
        } else {
            const errorMessage = "Failed to fetch user assets, There was some error.";
            toast.error(errorMessage);
            yield put({ type: types.GET_MUSIC_FAILURE });
        }
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
function* deleteMusicAsset(action: any) {
    let userId = yield select(selectID);
    const assetId = action.payload;
    const queryObj = {
        userId,
        assetId
    }
    try {
        const result = yield deleteMusicApi(queryObj);
        if (result.status === 200) {
            const assets = yield select(selectMusicAssets);
            const updatedAssets = assets.filter(
                (asset: any) => asset._id !== assetId
            );
            yield put({ type: types.DELETE_MUSIC_SUCCESS, payload: updatedAssets });
            toast.info("Asset deleted");
        } else {
            yield put({ type: types.DELETE_MUSIC_FAILURE });
            toast.info("Failed to delete asset");
        }
    }
    catch (error) {
        yield put({ type: types.DELETE_MUSIC_FAILURE });
        toast.info("Failed to delete asset");
    }
}
function* getCampaignTemplates(action: any) {
    try {
        const result = yield getTemplatesApi();
        if (result.status === 200) {
            yield put({
                type: types.GET_CAMPAIGN_TEMPLATES_SUCCESS,
                payload: result.data.templates
            });
        } else {
            yield put({ type: types.GET_CAMPAIGN_TEMPLATES_FAILURE });
        }
    } catch (error) {
        console.log("error", error);
        if (error.response) {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            yield put({ type: types.GET_CAMPAIGN_TEMPLATES_FAILURE });
        } else if (error.request) {
            const errorMessage = "Error. Please check your internet connection.";
            toast.error(errorMessage);
            yield put({ type: types.GET_CAMPAIGN_TEMPLATES_FAILURE });
        } else {
            const errorMessage = "Unexpected error";
            toast.error(errorMessage);
            yield put({ type: types.GET_CAMPAIGN_TEMPLATES_FAILURE });
        }
    }
}
export function* assetWatcher() {
    yield takeEvery(types.ADD_ASSET, addUserAsset);
    yield takeEvery(types.GET_ASSETS, getUserAsset);
    yield takeEvery(types.DELETE_ASSET, deleteUserAsset);
    yield takeEvery(types.ADD_MUSIC, addMusicAsset);
    yield takeEvery(types.DELETE_MUSIC, deleteMusicAsset);
    yield takeEvery(types.GET_MUSIC, getMusicAsset);
    yield takeEvery(types.GET_CAMPAIGN_TEMPLATES, getCampaignTemplates);

}