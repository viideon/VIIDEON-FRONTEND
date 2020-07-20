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