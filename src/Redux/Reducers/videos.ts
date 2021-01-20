import { types } from "../Types/videos";
import { types as authTypes } from "../Types/auth";

let initialState: any = {
  videoSaved: null,
  videoSend: null,
  videos: [],
  page: 0,
  loadMore: true,
  videoCount: 0,
  addSearched: true,
  campaignCount: 0,
  viewCount: 0,
  watchCount: 0,
  emailOpenCount: 0,
  ctaCount: 0,
  emailShareCount: 0
};
const videoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authTypes.LOUGOUT:
      return { ...initialState, videos: [] };
    case types.VIDEO_SEND_REQUEST:
      return {
        ...state,
        loading: true,
        videoSend: null
      };
    case types.VIDEO_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        videoSend: true
      };
    case types.VIDEO_SEND_FAILURE:
      return {
        ...state,
        error: true,
        videoSend: false,
        loading: false
      };
    case types.TOGGLE_SEND_VARIABLE:
      return { ...state, videoSaved: null };
    case types.GET_USER_VIDEOS:
      return {
        ...state,
        loadingVideos: true,
        page: state.page + 1
      };
    case types.LOADMORE_TRUE:
      return {
        ...state,
        loadMore: true
      };
    case types.DISABLE_LOADMORE:
      return {
        ...state,
        loadMore: false
      };
    case types.RESET_VIDEO_PAGE:
      return { ...state, page: 0, videos: [], loadMore: true };
    case types.SEARCH_USER_VIDEOS:
      return {
        ...state,
        loadingVideos: true,
        page: 1,
        addSearched: true
      };
    case types.GET_USER_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
        loadingVideos: false
      };
    case types.EMPTY_PAGE:
      return {
        ...state,
        page: 0,
        videos: [],
        addSearched: false
      };

    case types.SEARCH_VIDEOS_SUCCESS:
      if (state.addSearched) {
        return {
          ...state,
          videos: action.payload,
          loadingVideos: false
        };
      }
      return state;

    case types.GET_USER_VIDEOS_FAILED:
      return {
        ...state,
        error: action.payload,
        loadingVideos: false
      };
    case types.GET_CAMPAIGN_VIDEOS_SUCCESS:
      return {
        ...state,
        error: false,
        loadingVideos: false,
        campaignVideos: action.payload.video
      };
    case types.GET_CAMPAIGN_VIDEOS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingVideos: false,
        campaignVideos: undefined
      };
    case types.GET_CAMPAIGN_VIDEOS_REQUEST:
      return {
        ...state,
        error: false,
        loadingVideos: true
      };
    case types.GET_VIDEO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingVideos: false
      };
    case types.COUNT_VIDEO_SUCCESS:
      return {
        ...state,
        videoCount: action.payload.count,
        viewCount: action.payload.viewCount,
        watchCount: action.payload.watchCount,
        emailOpenCount: action.payload.emailOpenCount,
        ctaCount: action.payload.ctaCount,
        emailShareCount: action.payload.emailShareCount
      };
    case types.COUNT_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaignCount: action.payload
      };
    case types.UPDATE_VIDEO:
      return { ...state, isVideoUpdating: true };
    case types.UPDATE_VIDEO_SUCCESS:
      return { ...state, singleVideo: action.payload, isVideoUpdating: false };
    case types.UPDATE_VIDEO_FAIL:
      return { ...state, isVideoUpdating: false };
    case types.ENABLE_SAVEBTN:
      return { ...state, disableBtn: false };
    case types.VIDEO_SAVE:
      return { ...state, loading: true, videoSaved: null, disableBtn: true };
    case types.VIDEO_SAVE_SUCESS:
      return { ...state, loading: false, videoSaved: true };
    case types.VIDEO_SAVE_FAILURE:
      return { ...state, loading: false, videoSaved: false, disableBtn: false };
    case types.GET_VIDEO:
      return { ...state, loadingVideo: true };
    case types.GET_VIDEO_SUCCESS:
      return { ...state, loadingVideo: false, singleVideo: action.payload };
    case types.GET_SAVED_VIDEO_ID:
      return { ...state, savedVideoId: action.payload };
    case types.SEND_MULTIPLE_EMAIL:
      return { ...state, progressEmail: true };
    case types.MULTIPLE_EMAIL_SUCCESS:
      return { ...state, progressEmail: false };
    case types.MULTIPLE_EMAIL_FAILED:
      return { ...state, progressEmail: false };
    case types.DELETE_VIDEO:
      return { ...state, deletingVideo: true };
    case types.DELETE_VIDEO_FAILURE:
      return { ...state, deletingVideo: false, showDeleteDialog: false };
    case types.DELETE_VIDEO_SUCCESS:
      return { ...state, deletingVideo: false, showDeleteDialog: false };
    case types.ENABLE_DELETEDIALOG:
      return { ...state, showDeleteDialog: true };
    case types.UPDATE_VIDEOS_AFTEREDELETE:
      return { ...state, videos: action.payload };
    case types.CLEAN_SINGLEVIDEO:
      return { ...state, singleVideo: null };
    default: {
      return state;
    }
  }
};

export default videoReducer;
