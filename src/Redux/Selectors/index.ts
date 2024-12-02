export const selectID = (state: any) => {
  return state.auth.user._id;
};

export const selectVideos = (state: any) => {
  return state.video.videos;
};
export const selectAssets = (state: any) => {
  return state.asset.assets;
};
export const selectMusicAssets = (state: any) => {
  return state.asset.musicAssets;
};
export const getVideoById = (state: any, id: string) => {
  if (id) {
    return state.video.videos.find((video: any) => video._id === id);
  }
};
export const getPageNo = (state: any) => {
  return state.video.page ? state.video.page : 1;
};

export const getVideosLength = (state: any) => {
  return state.video.videos ? state.video.videos.length : 0;
};
export const isLoadMore = (state: any) => {
  return state.video.loadMore;
};
export const isEmailConfigPresent = (state: any) => {
  return state.email.emailConfigurations.length;
};
export const selectEmailConfigs = (state: any) => {
  return state.email.emailConfigurations;
};
export const getLogoAssets = (state: any) => {
  return (
    state.asset.assets &&
    state.asset.assets.filter((asset: any) => asset.type === "logo")
  );
};
export const getThumbnailAssets = (state: any) => {
  return (
    state.asset.assets &&
    state.asset.assets.filter((asset: any) => asset.type === "thumbnail")
  );
};
