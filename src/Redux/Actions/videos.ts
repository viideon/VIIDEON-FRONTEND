import {
  types,
  VideoEmailAction,
  VideoSaveAction,
  getUserVideoAction,
  updateVideoAction,
  VideoUpdate,
  EmailVideo,
  VideoSave,
} from "../Types/videos";

export function sendVideoToEmail(video: EmailVideo): VideoEmailAction {
  return {
    type: types.VIDEO_SEND_REQUEST,
    payload: video,
  };
}

export function saveVideo(videoInfo: VideoSave): VideoSaveAction {
  return {
    type: types.VIDEO_SAVE,
    payload: videoInfo,
  };
}

export function getUserVideos(videoType: any): getUserVideoAction {
  return {
    type: types.GET_USER_VIDEOS,
    payload: videoType,
  };
}

export function searchUserVideos(title: any) {
  return {
    type: types.SEARCH_USER_VIDEOS,
    payload: title,
  };
}
export function emptyPage() {
  return {
    type: "EMPTY_PAGE",
  };
}
export function updateVideo(video: VideoUpdate): updateVideoAction {
  return {
    type: types.UPDATE_VIDEO,
    payload: video,
  };
}

export function toggleSendVariable() {
  return {
    type: types.TOGGLE_SEND_VARIABLE,
  };
}

export function getVideo(id: string) {
  return {
    type: types.GET_VIDEO,
    payload: id,
  };
}

export function deleteVideo(id: string) {
  return {
    type: types.DELETE_VIDEO,
    payload: id,
  };
}
export function sendMultipleEmails(emailVideoObj: any) {
  return {
    type: types.SEND_MULTIPLE_EMAIL,
    payload: emailVideoObj,
  };
}

export function resetPage() {
  return {
    type: types.RESET_VIDEO_PAGE,
  };
}
export function getVideoCount() {
  return {
    type: types.COUNT_VIDEO,
  };
}

export function getCampaignCount() {
  return {
    type: types.COUNT_CAMPAIGN
  }
}

export function cleanSingleVideo() {
  return {
    type: types.CLEAN_SINGLEVIDEO,
  };
}

export function updateVideoViews(id: any) {
  return {
    type: types.UPDATE_VIEW_REQUEST,
    payload: id,
  };
}

export function updateVideoWatch(id: any) {
  return {
    type: types.UPDATE_VIDEO_WATCH_REQUEST,
    payload: id,
  };
}

export function updateEmailShare(id: any) {
  return {
    type: types.UPDATE_EMAIL_SHARE_REQUEST,
    payload: id,
  };
}

export function getCampaignVideos(id: any) {
  return {
    type: types.GET_CAMPAIGN_VIDEOS_REQUEST,
    payload: id,
  };
}
