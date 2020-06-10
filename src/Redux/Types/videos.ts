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
const UPDATE_VIDEO_FAIL: string = "UPDATE_VIDEO_FAIL";
const TOGGLE_SEND_VARIABLE = "TOGGLE_SEND_VARIABLE";
const GET_VIDEO = "GET_VIDEO";
const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
const GET_VIDEO_FAILURE = "GET_VIDEO_FAILURE";
const GET_SAVED_VIDEO_ID = "GET_SAVED_VIDEO_ID";
const SEND_MULTIPLE_EMAIL = "SEND_MULTIPLE_EMAIL";
const MULTIPLE_EMAIL_FAILED = "MULTIPLE_EMAIL_FAILED";
const MULTIPLE_EMAIL_SUCCESS = "MULTIPLE_EMAIL_SUCCESS";
const RESET_VIDEO_PAGE = "RESET_VIDEO_PAGE";
const DISABLE_LOADMORE = "DISABLE_LOADMORE";
const DELETE_VIDEO = "DELETE_VIDEO";
const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS";
const DELETE_VIDEO_FAILURE = "DELETE_VIDEO_FAILURE";
const SEARCH_USER_VIDEOS = "SEARCH_USER_VIDEOS";
const SEARCH_VIDEOS_SUCCESS = "SEARCH_VIDEOS_SUCCESS";
const COUNT_VIDEO = "GET_VIDEO_COUNT";
const COUNT_VIDEO_SUCCESS = "COUNT_VIDEO_SUCCESS";
const COUNT_VIDEO_FAIL = "COUNT_VIDEO_FAIL";
const CLEAN_SINGLEVIDEO = "CLEAN_SINGLEVIDEO";

export const types = {
  SEARCH_USER_VIDEOS,
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
  UPDATE_VIDEO_FAIL,
  TOGGLE_SEND_VARIABLE,
  GET_VIDEO_SUCCESS,
  GET_VIDEO,
  GET_VIDEO_FAILURE,
  GET_SAVED_VIDEO_ID,
  SEND_MULTIPLE_EMAIL,
  MULTIPLE_EMAIL_SUCCESS,
  MULTIPLE_EMAIL_FAILED,
  RESET_VIDEO_PAGE,
  DISABLE_LOADMORE,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAILURE,
  SEARCH_VIDEOS_SUCCESS,
  COUNT_VIDEO,
  COUNT_VIDEO_SUCCESS,
  COUNT_VIDEO_FAIL,
  CLEAN_SINGLEVIDEO
}
export interface EmailVideo {
  url?: string;
  id?: string;
  recieverEmail: string;
}
export interface VideoSave {
  title: string;
  url: string;
  userId: string;
  thumbnail?: string;
}
export interface VideoUpdate {
  url?: string;
  thumbnail?: string;
  title?: string;
  userId?: string;
  recieverEmail?: string;
}
export interface MultiEmail {
  emails: Array<string>;
  videoId: string;
}
//Video State interface
export interface VideoState {
  video?: EmailVideo;
  success?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  videoSaved?: boolean | null;
  videoSend?: boolean | null;
  isVideoUpdated?: boolean | null;
  page: number;
  videos?: any;
  loadMore: boolean;
  videoCount: number;
}
// Action interfaces 
export interface VideoEmailAction {
  type: typeof VIDEO_SEND_REQUEST
  payload: EmailVideo
}

export interface VideoSaveAction {
  type: typeof VIDEO_SAVE
  payload: VideoSave
}

export interface getUserVideoAction {
  type: typeof GET_USER_VIDEOS,
}

export interface updateVideoAction {
  type: typeof UPDATE_VIDEO
  payload: VideoUpdate
}

export interface getVideo {
  type: typeof GET_VIDEO
  payload: string
}
export interface deleteVideo {
  type: typeof DELETE_VIDEO,
  payload: string
}
export interface sendMultipleEmails {
  type: typeof SEND_MULTIPLE_EMAIL
  payload: any
}