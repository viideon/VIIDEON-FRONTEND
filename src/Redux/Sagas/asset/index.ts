import { put, takeEvery, select } from "redux-saga/effects";
import { types } from "../../Types/asset";
import {
  addAssetApi,
  getAssetApi,
  deleteAssetApi,
  addMusicApi,
  getMusicApi,
  deleteMusicApi,
  getTemplatesApi,
  getIndustriesAPI,
  getPreviewApi,
  saveSettingsApi,
  getPublicMusicApi
} from "./api";
import {
  selectID,
  selectAssets,
  selectMusicAssets
} from "../../Selectors";
import { toast } from "react-toastify";

function* addUserAsset(action: any) {
  let userId = yield select(selectID);
  const queryObj = {
    userId: userId,
    asset: action.payload
  };
  try {
    yield addAssetApi(queryObj);
    yield put({ type: types.ADD_ASSET_SUCCESS });
  } catch (error) {
    toast.error("Failed to add your asset try again");
  }
}

function* addMusicAsset(action: any) {
  let userId = yield select(selectID);
  const queryObj = {
    userId: userId,
    asset: action.payload
  };
  try {
    yield addMusicApi(queryObj);
    yield put({ type: types.ADD_MUSIC_SUCCESS });
  } catch (error) {
    toast.error("Failed to add your asset try again");
  }
}
function* getUserAsset() {
  let userId = yield select(selectID);
  try {
    const result = yield getAssetApi(userId);
    yield put({
      type: types.GET_ASSETS_SUCCESS,
      payload: result.assets
    });
  } catch (error) {
    console.error(error);
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
function* getPublicMusicAsset() {
  try {
    const result = yield getPublicMusicApi();
    yield put({
      type: types.GET_PUBLIC_MUSIC_SUCCESS,
      payload: result.musicAssetIs
    });
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE });
    } else {
      const errorMessage = "Failed to fetch user assets, There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE })   
    }
  }
}
function* getMusicAsset() {
  let userId = yield select(selectID);
  try {
    const result = yield getMusicApi(userId);
    yield put({
      type: types.GET_MUSIC_SUCCESS,
      payload: result.musicAssets
    });
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
  };
  try {
    yield deleteAssetApi(queryObj);
    const assets = yield select(selectAssets);
    const updatedAssets = assets.filter(
      (asset: any) => asset._id !== assetId
    );
    yield put({ type: types.DELETE_ASSET_SUCCESS, payload: updatedAssets });
    toast.info("Asset deleted");
  } catch (error) {
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
  };
  try {
    yield deleteMusicApi(queryObj);
    const assets = yield select(selectMusicAssets);
    const updatedAssets = assets.filter(
      (asset: any) => asset._id !== assetId
    );
    yield put({ type: types.DELETE_MUSIC_SUCCESS, payload: updatedAssets });
    toast.info("Asset deleted");
  } catch (error) {
    yield put({ type: types.DELETE_MUSIC_FAILURE });
    toast.info("Failed to delete asset");
  }
}
function* getCampaignTemplates() {
  try {
    const result = yield getTemplatesApi();
    yield put({
      type: types.GET_CAMPAIGN_TEMPLATES_SUCCESS,
      payload: result.templates
    });
  } catch (error) {
    console.error("error", error);
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
function* getIndustries() {
  try {
    const result = yield getIndustriesAPI();
    yield put({
      type: types.GET_INDUSTRIES_SUCCESS,
      payload: result.industries
    });
  } catch (error) {
    console.error("error", error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    }
  }
}
function* getPreview(action: any) {
  try {
    const result = yield getPreviewApi(action.payload);
    yield put({
      type: types.PREVIEW_SUCCESS,
      payload: result.template
    });
  } catch (error) {
    console.error("error", error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.PREVIEW_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.PREVIEW_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.PREVIEW_FAILURE });
    }
  }
}
function* saveSettings(action: any) {
  try {
    const result = yield saveSettingsApi(action.payload);
    toast.info(result.message);
  } catch (error) {
    console.error("error", error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.SAVE_SETTINGS_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.SAVE_SETTINGS_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.SAVE_SETTINGS_FAILURE });
    }
  }
}
export function* assetWatcher() {
  yield takeEvery(types.ADD_ASSET, addUserAsset);
  yield takeEvery(types.GET_ASSETS, getUserAsset);
  yield takeEvery(types.GET_PUBLIC_MUSIC, getPublicMusicAsset);
  yield takeEvery(types.DELETE_ASSET, deleteUserAsset);
  yield takeEvery(types.ADD_MUSIC, addMusicAsset);
  yield takeEvery(types.DELETE_MUSIC, deleteMusicAsset);
  yield takeEvery(types.GET_MUSIC, getMusicAsset);
  yield takeEvery(types.GET_CAMPAIGN_TEMPLATES, getCampaignTemplates);
  yield takeEvery(types.GET_INDUSTRIES, getIndustries);
  yield takeEvery(types.PREVIEW_REQUEST, getPreview);
  yield takeEvery(types.SAVE_SETTINGS_REQUEST, saveSettings);
}
