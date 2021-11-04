import { types } from "../Types/asset";

export function addAsset(asset: any) {
  return {
    type: types.ADD_ASSET,
    payload: asset
  };
}
export function getAssets() {
  return {
    type: types.GET_ASSETS
  };
}
export function deleteAsset(assetId: any) {
  return {
    type: types.DELETE_ASSET,
    payload: assetId
  };
}
export function addMusicAsset(asset: any) {
  return {
    type: types.ADD_MUSIC,
    payload: asset
  };
}
export function getMusicAsset() {
  return {
    type: types.GET_MUSIC
  };
}
export function deleteMusicAsset(assetId: any) {
  return {
    type: types.DELETE_MUSIC,
    payload: assetId
  };
}

export function getCampaignTemplates() {
  return {
    type: types.GET_CAMPAIGN_TEMPLATES
  };
}

export function getIndustries() {
  return {
    type: types.GET_INDUSTRIES,
  }
}

export function selectIndustry(industry: any) {
  return {
    type: types.SELECT_INDUSTRY,
    payload: industry
  }
}

export function previewTemplate(setting: any) {
  return {
    type: types.PREVIEW_REQUEST,
    payload: setting
  }
}

export function saveTemplateSetting(setting: any) {
  return {
    type: types.SAVE_SETTINGS_REQUEST,
    payload: setting
  }
}
export function getPublicMusicAsset() {
  return {
    type: types.GET_PUBLIC_MUSIC
  };
}
