import { types } from "../Types/asset";

const assetsReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case types.GET_ASSETS:
            return {
                ...state,
                loadingAssets: true
            };
        case types.GET_ASSETS_SUCCESS: {
            return {
                ...state,
                loadingAssets: false,
                assets: action.payload
            }
        }
        case types.GET_ASSETS_FAILURE: {
            return {
                ...state,
                loadingAssets: false
            }
        }
        case types.DELETE_ASSET: {
            return {
                ...state,
                isDeletingAsset: true
            }
        }
        case types.DELETE_ASSET_SUCCESS: {
            return {
                ...state,
                isDeletingAsset: false,
                assets: action.payload
            }
        }
        case types.DELETE_ASSET_FAILURE: {
            return {
                ...state,
                isDeletingAsset: false
            }
        }
        default: {
            return state;
        }
    }
};

export default assetsReducer;
