import { types } from "../Types/asset";

const initialState = {
  assets: [],
  templates: [],
  industries: [],
  musicAssets: [],
  selectedIndustry: {},
  loadingAssets: false,
  isDeletingAsset: false,
  loadingTemplates: false,
  preview: "",
  publicAssets:null,
  errMessage:null
}

const assetsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_ASSETS:
      return {
        ...state,
        loadingAssets: true
      };
    case types.GET_ASSETS_SUCCESS:
      return {
        ...state,
        loadingAssets: false,
        assets: action.payload
      };
    case types.GET_ASSETS_FAILURE:
      return {
        ...state,
        loadingAssets: false
      };
    case types.GET_MUSIC:
      return {
        ...state,
        loadingAssets: true
      };
    case types.GET_MUSIC_SUCCESS:
      return {
        ...state,
        loadingAssets: false,
        musicAssets: action.payload
      };

    case types.GET_MUSIC_FAILURE:
      return {
        ...state,
        loadingAssets: false
      };
    case types.DELETE_ASSET:
      return {
        ...state,
        isDeletingAsset: true
      };
    case types.DELETE_ASSET_SUCCESS:
      return {
        ...state,
        isDeletingAsset: false,
        assets: action.payload
      };
    case types.DELETE_ASSET_FAILURE:
      return {
        ...state,
        isDeletingAsset: false
      };
    case types.DELETE_MUSIC:
      return {
        ...state,
        isDeletingAsset: true
      };
    case types.DELETE_MUSIC_SUCCESS:
      return {
        ...state,
        isDeletingAsset: false,
        musicAssets: action.payload
      };
    case types.DELETE_MUSIC_FAILURE:
      return {
        ...state,
        isDeletingAsset: false
      };
    case types.GET_CAMPAIGN_TEMPLATES:
      return {...state,loadingTemplates: true};
    case types.GET_CAMPAIGN_TEMPLATES_SUCCESS:
      let templates = action.payload;
      return { ...state, loadingTemplates: false, templates: templates };
    case types.GET_CAMPAIGN_TEMPLATES_FAILURE:
      return { ...state, loadingTemplates: false };
    case types.GET_INDUSTRIES:
      return {...state,loadingTemplates: true};
    case types.GET_INDUSTRIES_SUCCESS:
      return { ...state, loadingTemplates: false, industries: action.payload };
    case types.GET_INDUSTRIES_FAILURE:
      return { ...state, loadingTemplates: false };
    case types.SELECT_INDUSTRY:
      return { ...state, selectedIndustry: action.payload };
    case types.PREVIEW_SUCCESS:
      return { ...state, preview: action.payload }
      case types.GET_PUBLIC_MUSIC_SUCCESS:
      return { ...state, publicAssets:action.payload };
      case types.GET_PUBLIC_MUSIC_FAILURE:
        return { ...state, errMessage: null };
    default: {
      return state;
    }
  }
};

export default assetsReducer;
