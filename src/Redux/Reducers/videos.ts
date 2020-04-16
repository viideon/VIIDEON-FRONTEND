import { types, VideoState } from "../Types/videos";

let initialState: VideoState = {
  videoSaved: null,
  videoSend: null,
  isVideoUpdated: null,
};
const videoReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
    case types.GET_USER_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload
      }
    case types.GET_USER_VIDEOS_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case types.UPDATE_VIDEO:
      return { ...state, isVideoUpdated: null }
    case types.UPDATE_VIDEO_SUCCESS:
      return { ...state, videos: action.payload, isVideoUpdated: true }
    case types.UPDATE_VIDEO_FAIL:
      return { ...state, isVideoUpdated: false }
    case types.SET_VIDEO_UPDATED_NULL:
      return { ...state, isVideoUpdated: null }
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
