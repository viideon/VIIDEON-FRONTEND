import { types } from '../Types/asset';

export function addAsset(asset: any) {
    return {
        type: types.ADD_ASSET,
        payload: asset
    }
}
export function getAssets() {
    return {
        type: types.GET_ASSETS
    }
}
export function deleteAsset(assetId: any) {
    return {
        type: types.DELETE_ASSET,
        payload: assetId
    }
}