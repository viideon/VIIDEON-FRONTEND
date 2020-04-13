const VIDEO_SEND_REQUEST: string = "VIDEO_SEND_REQUEST";
const VIDEO_SEND_SUCCESS: string = "VIDEO_SEND_SUCCESS";
const VIDEO_SEND_FAILURE: string = "VIDEO_SEND_FAILURE";
const VIDEO_SAVE: string = "VIDEO_SAVE";
const VIDEO_SAVE_SUCESS: string = "VIDEO_SAVE_SUCESS";
const VIDEO_SAVE_FAILURE: string = "VIDEO_SAVE_FAILURE";
const GET_USER_VIDEOS: string = "GET_USER_VIDEOS";
const GET_USER_VIDEOS_SUCCESS: string = "GET_USER_VIDEOS_SUCCESS";
const GET_USER_VIDEOS_FAILED: string = "GET_USER_VIDEOS_FAILURE";
const UPDATE_VIDEO: string = "UPDATE_VIDEO";
const UPDATE_VIDEO_SUCCESS: string = "UPDATE_VIDEO_SUCCESS";
const UPDATE_VIDEO_FAIL: string = "UPDATE_VIDEO_FAIL"

export const types = {
  VIDEO_SEND_REQUEST,
  VIDEO_SEND_SUCCESS,
  VIDEO_SEND_FAILURE,
  VIDEO_SAVE,
  VIDEO_SAVE_SUCESS,
  VIDEO_SAVE_FAILURE,
  GET_USER_VIDEOS,
  GET_USER_VIDEOS_FAILED,
  GET_USER_VIDEOS_SUCCESS,
  UPDATE_VIDEO,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAIL
}
export interface EmailVideo {
  url: string;
  recieverEmail: string;
}
export interface VideoSave {
  title: string;
  url: string;
  userId: string;
}
export interface VideoUpdate {
  url?: string;
  thumbnail?: string;
  title?: string;
  userId?: string;
  recieverEmail?: string;
}

export interface VideoState {
  video?: EmailVideo;
  success?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;

}
export interface VideoAction {
  type: typeof VIDEO_SEND_REQUEST
  payload: EmailVideo
}

export interface VideoSaveAction {
  type: typeof VIDEO_SAVE
  payload: VideoSave
}

export interface getUserVideoAction {
  type: typeof GET_USER_VIDEOS
}

export interface updateVideoAction {
  type: typeof UPDATE_VIDEO
  payload: VideoUpdate
}