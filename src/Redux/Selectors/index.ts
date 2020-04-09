export const selectID = (state: any) => {
    return state.auth.user.user._id;
};

export const selectVideos = (state: any) => {
    return state.video.videos;
}
export const getVideoById = (state: any, id: string) => {
    if (id) {
        return state.video.videos.find((video: any) => video._id === id);
    }
}