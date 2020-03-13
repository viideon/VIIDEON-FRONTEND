const VIDEO_REQUEST: string = "VIDEO_REQUEST";
const VIDEO_SUCCESS: string = "VIDEO_SUCCESS";
const VIDEO_FAILURE: string = "VIDEO_FAILURE";

export const types = {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAILURE,
}
export interface Video {
    url: string;
    thumbnail:string;
    title:string;
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