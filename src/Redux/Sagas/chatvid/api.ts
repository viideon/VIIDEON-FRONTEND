import {API} from 'aws-amplify';
import S3 from "aws-sdk/clients/s3";
import { config } from "../../../config/aws";

export function saveChatVid(chatvid: any) {
  return API.post('Backend', "/chatvid/", {body: chatvid});
}
export function addStepToChatvid(step: any) {
  return API.patch('Backend', '/chatvid/', {body: step})
}
export function getChatvids(userId: string) {
  return API.get('Backend', '/chatvid', {queryStringParameters: {userId}});
}
export function getChatvid(chatvidId: string) {
  return API.get('Backend', '/chatvid', {queryStringParameters: {chatvidId}});
}
export function replyToAChatvid(chatvid: any) {
  console.log("email on reply response",chatvid)
  return API.post('Backend', `/chatvid/reply`, {body: chatvid});
}
export function updateStepJump(step: any) {
  console.log("jump step in api",step)
  return API.patch('Backend', `/chatvid/step`, {body: step});
}
export function saveMetrics(payload: any) {
  return API.post('Backend', `/chatvid/metrics`, {body: payload});
}
export function getMetrics(payload: any) {
  return API.post('Backend', `/chatvid/metrics/${payload.chatvidId}`, {body: payload});
}
export function chatVidDelete(payload: any) {
  return API.del('Backend', `/chatvid/delete/${payload}`, {});
}
export function emailVideoSend(payload: any) {
  console.log("in api payload",payload)
  return API.post('Backend', `/user/emailvideo`, {body: payload});
}



export async function deleteDataAws(imageUrl: any) {
  if (imageUrl) {
    try {
      const s3 = new S3();
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
