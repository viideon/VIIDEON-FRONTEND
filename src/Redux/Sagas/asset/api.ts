import API from "../../../lib/Api";

export async function addAssetApi(queryObj: any) {
  const { asset, userId } = queryObj;
  return API.post("/asset/add", { userId, asset });
}
export async function getAssetApi(userId: any) {
  return API.get("/asset/get", { params: { userId } });
}
export async function deleteAssetApi(queryObj: any) {
  const { userId, assetId } = queryObj;
  // console.log(queryObj)
  return API.delete("/asset/remove", { params: { userId, assetId } });
}

export async function addMusicApi(queryObj: any) {
  const { asset, userId } = queryObj;
  return API.post("/asset/add/music", { userId, asset });
}
export async function getMusicApi(userId: any) {
  return API.get("/asset/get/music", { params: { userId } });
}
export async function deleteMusicApi(queryObj: any) {
  const { userId, assetId } = queryObj;
  // console.log("in api",queryObj)
  return API.delete("/asset/remove/music", { params: { userId, assetId } });
}
export async function getTemplates() {
  return API.get("/assets/campaign/templates");
}

export const getTemplatesApi = () => {
  return API.get("/campaign/templates");
};

export const getIndustriesAPI = () => {
  return API.get("/industry/");
}

export const getPreviewApi = (settings: any) => {
  console.log("in api for get preview",settings)
  return API.post("/user/preview/", {settings});
}

export const saveSettingsApi = (settings: any) => {
  console.log("settings in api ,",settings)
  return API.post("/user/template/", {settings});
}

export async function getPublicMusicApi() {
  return API.get("/asset/getpublicmusic");
}
