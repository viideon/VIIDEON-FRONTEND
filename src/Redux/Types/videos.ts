const VIDEO_REQUEST: string = "VIDEO_REQUEST";
const VIDEO_SUCCESS: string = "VIDEO_SUCCESS";
const VIDEO_FAILURE: string = "VIDEO_FAILURE";
const VIDEO_SAVE: string = "VIDEO_SAVE";
const VIDEO_SAVE_SUCESS: string = "VIDEO_SAVE_SUCESS";
const VIDEO_SAVE_FAILURE: string = "VIDEO_SAVE_FAILURE";

export const types = {
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
  VIDEO_FAILURE,
  VIDEO_SAVE,
  VIDEO_SAVE_SUCESS,
  VIDEO_SAVE_FAILURE,
}
export interface Video {
  url: string;
  thumbnail: string;
  title: string;
  userId: string;
  recieverEmail: string;
}
export interface VideoSave {
  url: string;
  userId: string;
}

export interface VideoState {
  video?: Video;
  success?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;

}
export interface VideoAction {
  type: typeof VIDEO_REQUEST
  payload: Video
}

export interface VideoSaveAction {
  type: typeof VIDEO_SAVE
  payload: VideoSave
}