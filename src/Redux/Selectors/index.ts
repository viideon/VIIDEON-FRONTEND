export const selectID = (state: any) => {
    console.log("state", state.auth.user);
    return state.auth.user._id;
};

export const selectVideos = (state: any) => {
    return state.video.videos;
}
export const getVideoById = (state: any, id: string) => {
    if (id) {
        return state.video.videos.find((video: any) => video._id === id);
    }
}

export const getVideosLength = (state: any) => {
    return state.video.videos ? state.video.videos.length : 0;
}