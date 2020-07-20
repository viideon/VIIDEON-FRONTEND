import API from "../../../lib/Api";

export async function addAssetApi(configObj: any) {
    const { asset, userId } = configObj;
    return API.post("/asset/add", { userId, asset });
}
export async function getAssetApi(userId: any) {
    return API.get("/asset/get", { params: { userId } })
}