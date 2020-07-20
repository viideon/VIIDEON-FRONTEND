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
        default: {
            return state;
        }
    }
};

export default assetsReducer;
