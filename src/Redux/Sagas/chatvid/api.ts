import API from "../../../lib/Api";
import AWS from "aws-sdk";
import { config } from "../../../config/aws";

export function saveChatVid(chatvid: any) {
  return API.post("/chatvid/", chatvid);
}
export function getChatvids(userId: string) {
  return API.get(`/chatvid/?userId=${userId}`);
}
export function getChatvid(chatvidId: string) {
  return API.get(`/chatvid/?chatvidId=${chatvidId}`);
}
export function replyToAChatvid(chatvid: any) {
  return API.post(`/chatvid/reply`, chatvid);
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
