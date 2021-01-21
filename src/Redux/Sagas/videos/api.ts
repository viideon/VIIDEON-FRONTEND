import API from "../../../lib/Api";
import AWS from "aws-sdk";
import { config } from "../../../config/aws";

export async function saveVideo(video: any) {
  console.log("video in api",video)
  return API.post("/video", video);
}
export async function updateVideoViews(id: any) {
  return API.post("/video/updateViews", id);
}
export async function updateVideoWatch(id: any) {
  return API.post("/video/updateWatch", id);
}
export async function updateEmailShare(id: any) {
  return API.post("/video/updateEmailShare", id);
}
export async function updateCtaVideo(id: any) {
  return API.post("/video/update/cta", { id });
}
export async function sendVideoToEmail(video: any) {
  console.log("videoemail in api",video)
  return API.post("/email/send", video);
}

export async function sendMultiEmails(video: any) {
  return API.post("/email/send", video);
}

export async function getVideos() {
  return API.get("/video");
}
export async function getVideosByUserId(queryObj: any) {
  return API.get("/video/user", {
    params: { id: queryObj.userId, page: queryObj.page }
  });
}
export async function getCampaignVideos(queryObj: any) {
  return API.get("/video/campaignVideos", {
    params: { id: queryObj.userId, page: queryObj.page }
  });
}
export async function getVideosByTitle(queryObj: any) {
  return API.get("/video/user", {
    params: { id: queryObj.userId, page: queryObj.page, title: queryObj.title }
  });
}
export async function getCampaignVideosByTitle(queryObj: any) {
  return API.get("/video/campaignVideos", {
    params: { id: queryObj.userId, page: queryObj.page, title: queryObj.title }
  });
}
export async function updateUserVideo(video: any) {
  return API.patch("/video", video);
}
export async function deleteVideoById(callObj: any) {
  return API.delete("/video", {
    params: { id: callObj.videoId, pageNo: callObj.pageNo }
  });
}

export async function getSingleTemplate(name: any) {
  console.log("tempname",name)
  return API.get("/video/getTemplate", { params: { name } });
}
export async function getSingleVideo(id: string) {
  return API.get("/video/single", { params: { id } });
}
export async function videoCount(id: string) {
  return API.get("/video/count", { params: { id: id } });
}
export async function campaignCount(id: string) {
  return API.get("/video/campaign/count", { params: { id: id } });
}
export async function deleteDataAws(imageUrl: any) {
  if (imageUrl) {
    try {
      const s3 = new AWS.S3(config);
      const index = imageUrl.indexOf(".com/");
      imageUrl = imageUrl.substring(index + 5);
      const options = {
        Bucket: config.bucketName,
        Key: imageUrl
      };
      s3.deleteObject(options, () => {});
    } catch (e) {}
  }
}
