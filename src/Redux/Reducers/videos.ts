import { types, VideoState } from "../Types/videos";
import { types as authTypes } from "../Types/auth"

let initialState: VideoState = {
  videoSaved: null,
  videoSend: null,
  isVideoUpdated: null,
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
        loadingVideos: true
      }
    case types.GET_USER_VIDEOS_SUCCESS:
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
      return { ...state, videos: action.payload, isVideoUpdated: true, isVideoUpdating: false }
    case types.UPDATE_VIDEO_FAIL:
      return { ...state, isVideoUpdated: false, isVideoUpdating: false }
    case types.VIDEO_SAVE:
      return { ...state, loading: true, videoSaved: null }
    case types.VIDEO_SAVE_SUCESS:
      return { ...state, videoSaved: true, loading: false };
    case types.VIDEO_SAVE_FAILURE:
      return { ...state, videoSaved: false, loading: false };
    default: {
      return state;
    }
  }
};

export default videoReducer;
