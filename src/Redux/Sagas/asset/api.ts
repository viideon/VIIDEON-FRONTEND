import {API} from 'aws-amplify';

export async function addAssetApi(queryObj: any) {
  const { asset, userId } = queryObj;
  return API.post('Backend', "/asset/add", {body: { userId, asset }});
}
export async function getAssetApi(userId: any) {
  return API.get('Backend', "/asset/get", { queryStringParameters: { userId } });
}
export async function deleteAssetApi(queryObj: any) {
  const { userId, assetId } = queryObj;
  return API.del('Backend', "/asset/remove", { queryStringParameters: { userId, assetId } });
}

export async function addMusicApi(queryObj: any) {
  const { asset, userId } = queryObj;
  return API.post('Backend', "/asset/add/music", { body: { userId, asset }});
}
export async function getMusicApi(userId: any) {
  return API.get('Backend', "/asset/get/music", { queryStringParameters: { userId } });
}
export async function deleteMusicApi(queryObj: any) {
  const { userId, assetId } = queryObj;
  return API.del('Backend', "/asset/remove/music", { queryStringParameters: { userId, assetId } });
}
export async function getTemplates() {
  return API.get('Backend', "/assets/campaign/templates", {});
}

export const getTemplatesApi = () => {
  return API.get('Backend', "/campaign/templates", {});
};

export const getIndustriesAPI = () => {
  return API.get('Backend', "/industry", {});
}

export const getPreviewApi = (settings: any) => {
  return API.post('Backend', "/user/preview/", {body: settings});
}

export const saveSettingsApi = (settings: any) => {
  return API.post('Backend', "/user/template/", {body: settings});
}

export async function getPublicMusicApi() {
  return API.get('Backend', "/asset/getpublicmusic", {});
}
