import {types, VideoAction, Video} from "../Types/videos";

export function VideoUser(video: Video): VideoAction  {
    return {
      type : types.VIDEO_REQUEST,
      payload: video
    };
  }