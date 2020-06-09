import { types, VideoState } from "../Types/videos";
import { types as authTypes } from "../Types/auth"

let initialState: VideoState = {
  videoSaved: null,
  videoSend: null,
  videos: [],
  page: 0,
  loadMore: true,
};
const videoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authTypes.LOUGOUT:
      return { ...initialState, videos: [] }
    case types.VIDEO_SEND_REQUEST:
      return {
        ...state,
        loading: true,
        videoSend: null,
      };
    case types.VIDEO_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        videoSend: true,
        success: action.payload
      };
    case types.VIDEO_SEND_FAILURE:
      return {
        ...state,
        error: true,
        videoSend: false,
        loading: false,
        errorMessage: action.payload.message
      };
    case types.TOGGLE_SEND_VARIABLE:
      return { ...state, videoSaved: null }
    case types.GET_USER_VIDEOS:
      return {
        ...state,
        loadingVideos: true,
        page: state.page + 1,
      }
    case "LOADMORE_TRUE":
      return {
        ...state,
        loadMore: true
      }
    case types.DISABLE_LOADMORE:
      return {
        ...state,
        loadMore: false
      }
    case types.RESET_VIDEO_PAGE:
      return { ...state, page: 0, videos: [], loadMore: true }
    case types.SEARCH_USER_VIDEOS:
      return {
        ...state, loadingVideos: true, page: 1
      }
    case types.GET_USER_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
        loadingVideos: false
      }
    case "EMPTY_PAGE":
      return {
        ...state,
        page: 0,
        videos: []
      }
    case types.SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loadingVideos: false
      }

    case types.GET_USER_VIDEOS_FAILED:
      return {
        ...state,
        error: action.payload,
        loadingVideos: false
      }
    case types.UPDATE_VIDEO:
      return { ...state, isVideoUpdating: true }
    case types.UPDATE_VIDEO_SUCCESS:
      return { ...state, videos: action.payload, isVideoUpdating: false }
    case types.UPDATE_VIDEO_FAIL:
      return { ...state, isVideoUpdating: false }
    case types.VIDEO_SAVE:
      return { ...state, loading: true, videoSaved: null }
    case types.VIDEO_SAVE_SUCESS:
      return { ...state, loading: false, videoSaved: true };
    case types.VIDEO_SAVE_FAILURE:
      return { ...state, loading: false, videoSaved: false };
    case types.GET_VIDEO:
      return { ...state, loadingVideo: true }
    case types.GET_VIDEO_SUCCESS:
      return { ...state, loadingVideo: false, singleVideo: action.payload }
    case types.GET_VIDEO_FAILURE:
      return { ...state, loadingVideo: false };
    case types.GET_SAVED_VIDEO_ID:
      return { ...state, savedVideoId: action.payload }
    case types.SEND_MULTIPLE_EMAIL:
      return { ...state, progressEmail: true }
    case types.MULTIPLE_EMAIL_SUCCESS:
      return { ...state, progressEmail: false }
    case types.MULTIPLE_EMAIL_FAILED:
      return { ...state, progressEmail: false }
    case types.DELETE_VIDEO:
      return { ...state, deletingVideo: true }
    case types.DELETE_VIDEO_FAILURE:
      return { ...state, deletingVideo: false }
    case types.DELETE_VIDEO_SUCCESS:
      return { ...state, deletingVideo: false }
    default: {
      return state;
    }
  }
};

export default videoReducer;
