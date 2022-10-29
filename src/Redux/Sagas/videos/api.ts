import { API } from "aws-amplify";

export async function saveVideo(video: any) {
  console.log("video in api", video);
  return API.post("Backend", "/video", { body: video });
}
export async function updateVideoViews(id: any) {
  return API.post("Backend", "/video/updateViews", { body: id });
}
export async function updateVideoWatch(id: any) {
  return API.post("Backend", "/video/updateWatch", { body: id });
}
export async function updateEmailShare(id: any) {
  return API.post("Backend", "/video/updateEmailShare", { body: id });
}
export async function updateCtaVideo(id: any) {
  return API.post("Backend", "/video/update/cta", { body: { id } });
}
export async function sendVideoToEmail(video: any) {
  console.log("videoemail in api", video);
  return API.post("Backend", "/email/send", { body: video });
}
export async function getSingleTemplate(video: any) {
  console.log("tempname", video);
  return API.post("Backend", "/video/getTemplate", { body: video });
}

export async function sendMultiEmails(video: any) {
  // console.log("multiemail in api",video)
  return API.post("Backend", "/email/send", { body: video });
}

export async function getVideos() {
  return API.get("Backend", "/video", {});
}
export async function getVideosByUserId(queryObj: any) {
  return API.get("Backend", "/video/user", {
    queryStringParameters: { id: queryObj.userId, page: queryObj.page }
  });
}
export async function getCampaignVideos(queryObj: any) {
  return API.get("Backend", "/video/campaignVideos", {
    queryStringParameters: { id: queryObj.userId, page: queryObj.page }
  });
}
export async function getVideosByTitle(queryObj: any) {
  return API.get("Backend", "/video/user", {
    queryStringParameters: {
      id: queryObj.userId,
      page: queryObj.page,
      title: queryObj.title
    }
  });
}
export async function getCampaignVideosByTitle(queryObj: any) {
  return API.get("Backend", "/video/campaignVideos", {
    queryStringParameters: {
      id: queryObj.userId,
      page: queryObj.page,
      title: queryObj.title
    }
  });
}
export async function updateUserVideo(video: any) {
  return API.patch("Backend", "/video", { body: video });
}
export async function deleteVideoById(callObj: any) {
  return API.del("Backend", "/video", {
    queryStringParameters: { id: callObj.videoId, pageNo: callObj.pageNo }
  });
}

export async function getSingleVideo(id: string) {
  return API.get("Backend", "/video/single", { queryStringParameters: { id } });
}
export async function videoCount(id: string) {
  return API.get("Backend", "/video/count", {
    queryStringParameters: { id: id }
  });
}
export async function campaignCount(id: string) {
  return API.get("Backend", "/video/campaign/count", {
    queryStringParameters: { id: id }
  });
}
