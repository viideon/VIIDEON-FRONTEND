import { types, VideoAction, VideoSaveAction, Video, VideoSave } from "../Types/videos";

export function VideoUser(video: Video): VideoAction {
  return {
    type: types.VIDEO_REQUEST,
    payload: video
  };
}

export function saveVideo(videoInfo: VideoSave): VideoSaveAction {
  return {
    type: types.VIDEO_SAVE,
    payload: videoInfo
  }
}