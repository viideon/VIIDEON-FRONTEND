import { types, VideoEmailAction, VideoSaveAction, getUserVideoAction, updateVideoAction, VideoUpdate, EmailVideo, VideoSave } from "../Types/videos";

export function sendVideoToEmail(video: EmailVideo): VideoEmailAction {
  return {
    type: types.VIDEO_SEND_REQUEST,
    payload: video
  };
}

export function saveVideo(videoInfo: VideoSave): VideoSaveAction {
  return {
    type: types.VIDEO_SAVE,
    payload: videoInfo
  }
}

export function getUserVideos(): getUserVideoAction {
  return {
    type: types.GET_USER_VIDEOS,
  }
}

export function searchUserVideos(title: any) {
  return {
    type: types.SEARCH_USER_VIDEOS,
    payload: title
  }
}
export function emptyPage() {
  return {
    type: "EMPTY_PAGE"
  }
}
export function updateVideo(video: VideoUpdate): updateVideoAction {
  return {
    type: types.UPDATE_VIDEO,
    payload: video
  }
}

export function toggleSendVariable() {
  return {
    type: types.TOGGLE_SEND_VARIABLE
  }
}

export function getVideo(id: string) {
  return {
    type: types.GET_VIDEO,
    payload: id
  }
}

export function deleteVideo(id: string) {
  return {
    type: types.DELETE_VIDEO,
    payload: id
  }
}
export function sendMultipleEmails(emailVideoObj: any) {
  return {
    type: types.SEND_MULTIPLE_EMAIL,
    payload: emailVideoObj
  }
}

export function resetPage() {
  return {
    type: types.RESET_VIDEO_PAGE
  }
}