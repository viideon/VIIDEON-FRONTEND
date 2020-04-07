import { types, VideoState } from "../Types/videos";

let initialState: VideoState = {

};
const videoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.VIDEO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case types.VIDEO_FAILURE:
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
    case types.VIDEO_SAVE_SUCESS:
      return { ...state, videSaved: true };
    case types.VIDEO_SAVE_FAILURE:
      return { ...state, videoSaved: false };
    default: {
      return state;
    }
  }
};

export default videoReducer;
