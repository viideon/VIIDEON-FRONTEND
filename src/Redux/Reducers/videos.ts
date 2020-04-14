import { types, VideoState } from "../Types/videos";

let initialState: VideoState = {
  videoSaved: false,
};
const videoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.VIDEO_SEND_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.VIDEO_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case types.VIDEO_SEND_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload.message
      };
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
    case types.UPDATE_VIDEO_SUCCESS:
      return { ...state, videos: action.payload, isVideoUpdated: true }
    case types.UPDATE_VIDEO_FAIL:
      return { ...state, isVideoUpdated: false }
    case types.VIDEO_SAVE:
      return { ...state, loading: true }
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
