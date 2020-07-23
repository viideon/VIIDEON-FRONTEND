import API from "../../../lib/Api";

export async function addAssetApi(queryObj: any) {
    const { asset, userId } = queryObj;
    return API.post("/asset/add", { userId, asset });
}
export async function getAssetApi(userId: any) {
    return API.get("/asset/get", { params: { userId } })
}
export async function deleteAssetApi(queryObj: any) {
    const { userId, assetId } = queryObj;
    return API.delete("/asset/remove", { params: { userId, assetId } });
}