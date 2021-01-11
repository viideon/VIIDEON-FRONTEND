import API from "../../../lib/Api";
import AWS from "aws-sdk";
import { config } from "../../../config/aws";

export function saveChatVid(chatvid: any) {
  return API.post("/chatvid/", chatvid);
}
export function addStepToChatvid(step: any) {
  return API.patch('/chatvid/', step)
}
export function getChatvids(userId: string) {
  return API.get(`/chatvid/?userId=${userId}`);
}
export function getChatvid(chatvidId: string) {
  return API.get(`/chatvid/?chatvidId=${chatvidId}`);
}
export function replyToAChatvid(chatvid: any) {
  console.log("email on reply response",chatvid)
  return API.post(`/chatvid/reply`, chatvid);
}
export function updateStepJump(step: any) {
  return API.patch(`/chatvid/step`, step);
}
export function saveMetrics(payload: any) {
  return API.post(`/chatvid/metrics`, payload);
}
export function getMetrics(payload: any) {
  return API.post(`/chatvid/metrics/${payload.chatvidId}`, payload);
}
export function chatVidDelete(payload: any) {
  return API.delete(`/chatvid/delete/${payload}`);
}
export function emailVideoSend(payload: any) {
  console.log("in api payload",payload)
  return API.post(`/user/emailvideo`, payload);
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
      s3.deleteObject(options, () => { });
    } catch (e) { }
  }
}
